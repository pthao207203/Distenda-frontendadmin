import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import "./LiveStream.css";
import { livestreamDetailController } from "../../../controllers/livestream.controller";

const LiveNow = () => {
  const { LivestreamID } = useParams();
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [livestream, setLivestream] = useState(null);

  useEffect(() => {
    if (!livestream) return;

    const video = videoRef.current;
    if (!video) return;

    // 🔴 ĐANG LIVE → HLS
    if (livestream.LivestreamStatus === "live") {
      const hlsUrl = `http://localhost:8000/live/${livestream.LivestreamStreamKey}/index.m3u8`;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
      }
    }

    // 🟣 ĐÃ XONG → MP4 (S3 signed URL)
    if (
      livestream.LivestreamStatus === "ended" &&
      livestream.LivestreamVideoSignedUrl
    ) {
      video.src = livestream.LivestreamVideoSignedUrl;
    }
  }, [livestream]);



  if (loading) return <p>Đang tải livestream...</p>;
  if (!livestream) return <p>Không tìm thấy livestream</p>;

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
      <div className="relative">
        {livestream.LivestreamStatus === "live" && (
          <span className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded text-xs font-semibold text-white z-10">
            LIVE
          </span>
        )}

        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-full max-h-[35.5rem] object-cover bg-black"
        />
      </div>

      {/* INFO */}
      <div className="text-[#131313] flex justify-between mt-[8px]">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbae0514e8058efa2ff3c88f32951fbd7beba3099187677c6ba1c2f96547ea3f"
            alt="avatar"
            className="w-[4rem] h-[4rem] rounded-full object-cover"
          />

          {/* Name + time */}
          <div className="flex-1">
            <p className="text-[1.25rem] font-semibold mb-1">
              {livestream.createdBy?.UserId?.AdminFullName}
            </p>
            {livestream.LivestreamStartedAt && (
              <p className="text-[1rem]">
                {new Date(
                  livestream.LivestreamStartedAt
                ).toLocaleString("vi-VN")}
              </p>
            )}
          </div>
        </div>

        {/* ICONS (static demo) */}
        <div className="flex items-center gap-6 text-[1.25rem]">
          <div className="flex items-center gap-1">
            ❤️ <span>1.7k</span>
          </div>
          <div className="flex items-center gap-1">
            💬 <span>1.7k</span>
          </div>
          <div className="flex items-center gap-1">
            👁️ <span>1.7k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNow;
