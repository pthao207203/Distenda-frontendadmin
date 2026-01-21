import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import axios from "axios";
import { io } from "socket.io-client";
import "./LiveStream.css";
import { livestreamDetailController } from "../../../controllers/livestream.controller";

const LiveNow = () => {
  const { LivestreamID } = useParams();
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [livestream, setLivestream] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

  const getTotalReactions = () => {
    return reactions.length;
  };

  const getRelativeTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Vừa mới bắt đầu";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleString("vi-VN");
  };

  // Fetch livestream detail
  useEffect(() => {
    const fetchLivestream = async () => {
      try {
        setLoading(true);
        const response = await livestreamDetailController(LivestreamID);
        if (response.code === 200) {
          setLivestream(response.data);
          setReactions(response.data.reactions || []);
        } else {
          setError("Không thể tải thông tin livestream");
        }
      } catch (err) {
        setError("Lỗi khi tải livestream");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (LivestreamID) fetchLivestream();
  }, [LivestreamID]);

  // Fetch initial viewer count
  useEffect(() => {
    if (!LivestreamID) return;

    const fetchData = async () => {
      try {
        // Fetch viewer count
        const viewerResponse = await axios.get(
          `${API_BASE_URL}/livestreams/${LivestreamID}/active-viewers`,
          { withCredentials: true }
        );
        if (viewerResponse.data?.code === 200) {
          setViewerCount(viewerResponse.data.data?.activeViewers || 0);
        }

        // Fetch comment count
        const commentResponse = await axios.get(
          `${API_BASE_URL}/livestreams/${LivestreamID}/comments`,
          {
            params: { limit: 1, skip: 0 },
            withCredentials: true,
          }
        );
        if (commentResponse.data?.code === 200) {
          setCommentCount(commentResponse.data.data?.length || 0);
        }
      } catch (err) {
        console.error("Error fetching viewer count or comments:", err);
      }
    };

    fetchData();
  }, [LivestreamID, API_BASE_URL]);

  // Socket.io connection for livestream reactions
  useEffect(() => {
    if (!LivestreamID) return;

    socketRef.current = io(API_BASE_URL, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("watchLivestream", LivestreamID);
      socketRef.current.emit("joinLivestream", LivestreamID);
    });

    socketRef.current.on("livestreamReactionAdded", (data) => {
      if (data.livestreamId === LivestreamID) {
        setReactions(data.reactions || []);
      }
    });

    socketRef.current.on("livestreamReactionRemoved", (data) => {
      if (data.livestreamId === LivestreamID) {
        setReactions(data.reactions || []);
      }
    });

    socketRef.current.on("viewerCountUpdated", (data) => {
      if (data.livestreamId === LivestreamID) {
        setViewerCount(data.viewerCount || 0);
      }
    });

    socketRef.current.on("commentAdded", (comment) => {
      setCommentCount((prev) => prev + 1);
    });

    socketRef.current.on("commentDeleted", (data) => {
      setCommentCount((prev) => Math.max(0, prev - 1));
    });

    return () => {
      socketRef.current?.emit("stopWatchingLivestream", LivestreamID);
      socketRef.current?.emit("leaveLivestream", LivestreamID);
      socketRef.current?.disconnect();
    };
  }, [LivestreamID, API_BASE_URL]);

  // Video streaming setup
  useEffect(() => {
    if (!livestream) return;

    const video = videoRef.current;
    if (!video) return;

    // 🔴 ĐANG LIVE → HLS
    if (livestream.LivestreamStatus === "live") {
      const hlsUrl = `http://localhost:8000/live/${livestream.LivestreamStreamKey}/index.m3u8`;

      if (Hls.isSupported()) {
        const hls = new Hls({
          lowLatencyMode: true,
          liveSyncDuration: 1,
          liveMaxLatencyDuration: 2,
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setVideoLoaded(true);
          video.play().catch((error) => {
            console.warn("Autoplay was prevented:", error);
          });
        });
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
        setVideoLoaded(true);
        video.play().catch((error) => {
          console.warn("Autoplay was prevented:", error);
        });
      }
    }

    // 🟣 ĐÃ XONG → MP4 (S3 signed URL)
    if (
      livestream.LivestreamStatus === "ended" &&
      livestream.LivestreamVideoSignedUrl
    ) {
      video.src = livestream.LivestreamVideoSignedUrl;
      setVideoLoaded(true);
      video.play().catch((error) => {
        console.warn("Autoplay was prevented:", error);
      });
    }
  }, [livestream]);

  if (loading) return <p>Đang tải livestream...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!livestream) return <p>Không tìm thấy livestream</p>;
  console.log("livestream", livestream);
  return (
    <div className="overflow-hidden-scroll text-[#131313] p-[16px]">
      {/* TITLE */}
      <h2 className="font-semibold text-[1.5rem] mb-[8px]">
        {livestream.LivestreamTitle}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-[1.25rem] mb-[8px]">
        {livestream.LivestreamDescription}
      </p>

      {/* VIDEO */}
      <div className={`relative ${!videoLoaded ? "min-h-[300px]" : ""}`}>
        {livestream.LivestreamStatus === "live" && (
          <span className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded text-xs font-semibold text-white z-10">
            LIVE
          </span>
        )}

        <video
          ref={videoRef}
          controls
          className="w-full max-h-[35.5rem] object-cover bg-black"
        />
      </div>

      {/* INFO */}
      <div className="text-[#131313] flex justify-between mt-[8px]">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src={
              livestream.createdBy?.UserId?.AdminAvatar ||
              "https://cdn.builder.io/api/v1/image/assets/TEMP/bbae0514e8058efa2ff3c88f32951fbd7beba3099187677c6ba1c2f96547ea3f"
            }
            alt="avatar"
            className="w-[4rem] h-[4rem] rounded-full object-cover"
          />

          {/* Name + time */}
          <div className="flex-1">
            <p className="text-[1.25rem] font-semibold mb-1">
              {livestream.createdBy?.UserId?.AdminFullName}
            </p>
            <p className="text-[1rem]">
              {getRelativeTime(livestream.LivestreamStartedAt)}
            </p>
          </div>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-6 text-[1.25rem]">
          {/* Reactions */}
          <div className="flex items-center gap-1">
            ❤️ <span>{getTotalReactions()}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-1">
            💬 <span>{commentCount}</span>
          </div>

          {/* Viewers */}
          <div className="flex items-center gap-1">
            👁️ <span>{viewerCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNow;
