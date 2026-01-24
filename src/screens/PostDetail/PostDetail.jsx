import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { forumAdminController } from "../../controllers/forum.admin.controller";
import { Download } from "lucide-react";

/* ===== Helpers ===== */
const formatDateUTC = (date) => {
  if (!date) return "Chưa duyệt";
  return moment.utc(date).format("DD/MM/YYYY HH:mm:ss");
};

/* ===== Sub Components ===== */

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem]">
    <p className="mb-3 text-[#171717] text-opacity-50 font-medium">{label}</p>
    <p className="font-medium text-gray-900">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    0: { text: "Đã hủy", className: "bg-[#DF322B] text-white" },
    1: { text: "Đã duyệt", className: "bg-[#D1F669] text-[#131313]" },
    2: { text: "Chờ duyệt", className: "bg-[#FFD75B] text-[#131313]" },
  };

  const { text, className } = map[status] || {};

  return (
    <div
      className={`px-4 py-2 rounded-full text-center max-w-[80%] md:text-[1.25rem] text-[1rem] font-medium truncate ${className}`}
    >
      {text}
    </div>
  );
};

/* ===== Main Component ===== */

const PostDetail = () => {
  const { PostID } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await forumAdminController.getPostDetail(PostID);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [PostID]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  /* ===== CÁCH 2: LOGIC NÚT ===== */
  const canApprove = post.status === 2; // chỉ duyệt khi chờ duyệt
  const canReject = post.status !== 0; // huỷ được cả bài đã duyệt

  const handleApprove = async () => {
    if (!canApprove) return;
    if (!window.confirm("Xác nhận duyệt bài đăng này?")) return;

    try {
      await forumAdminController.approvePost(PostID);
      navigate("/forum");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async () => {
    if (!canReject) return;
    if (!window.confirm("Xác nhận huỷ bài đăng này?")) return;

    try {
      await forumAdminController.rejectPost(PostID);
      navigate("/forum");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex overflow-hidden text-[1.25rem] max-md:text-[1rem] flex-col p-[4rem] bg-white min-h-screen max-md:px-[1.25rem]">
      {/* ACTION BUTTONS – GIỮ NGUYÊN UX/UI */}
      <div className="flex gap-2.5 items-center justify-end mb-5 text-[1.25rem] max-md:text-[1rem] font-medium leading-none text-white min-w-[15rem]">
        {/* DUYỆT */}
        <button
          onClick={handleApprove}
          disabled={!canApprove}
          className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem]
            ${
              canApprove
                ? "bg-[#6C8299] hover:bg-[#55657a]"
                : "bg-[#CDD5DF] cursor-not-allowed"
            }`}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84fdfd4c4d34c64c558acb40d245b2d594b0b0f000c7b4c1dd0353682f135f9d?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="gap-2.5 self-stretch my-auto">Chấp nhận</span>
        </button>

        {/* HUỶ */}
        <button
          onClick={handleReject}
          disabled={!canReject}
          className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto whitespace-nowrap rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem]
            ${
              canReject
                ? "bg-[#DF322B] hover:bg-[#902723]"
                : "bg-[#FFD1D1] cursor-not-allowed"
            }`}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39a71fd8008a53a09d7a877aea83770214d261a5f742c728f7c5a0a06accb635?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="gap-2.5 self-stretch my-auto">Xoá</span>
        </button>
      </div>

      <h2 className="font-semibold text-[#171717] mb-4">Thông tin cơ bản</h2>

      {/* INFO GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <InfoItem label="Mã bài đăng" value={post.postId} />
        <InfoItem label="Tiêu đề" value={post.title} />
        <InfoItem label="Người đăng" value={post.author} />

        <InfoItem label="Ngày gửi" value={formatDateUTC(post.createdAt)} />
        <InfoItem label="Ngày duyệt" value={formatDateUTC(post.reviewedAt)} />

        <div>
          <p className="font-medium text-[#171717] text-opacity-50 mb-3">
            Trạng thái
          </p>
          <StatusBadge status={post.status} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <p className="text-gray-500 mb-2 font-medium">Nội dung</p>
        <div className="border border-[#6C8299]/80 rounded-lg p-4 whitespace-pre-line text-gray-800">
          {post.content}
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col mt-6">
        <p className="text-gray-500 mb-2 font-medium">Hình ảnh</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {post.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`post-${index}`}
              className="w-full h-[160px] object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* FILES */}
      {Array.isArray(post.files) && post.files.length > 0 && (
        <div className="flex flex-col mt-6">
          <p className="text-gray-500 mb-2 font-medium">Tệp đính kèm</p>

          <div className="flex flex-col gap-3">
            {post.files.map((file, index) => (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-[#6C8299]/60 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="text-gray-800 font-medium truncate">
                  {file.name || file.url.split("/").pop()}
                </span>

                <Download
                  size={20}
                  className="text-gray-400 hover:text-[#6C8299] transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
