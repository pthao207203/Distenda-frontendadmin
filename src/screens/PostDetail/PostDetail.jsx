import React from "react";
import moment from "moment";

/* ===== Sub Components ===== */

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col min-h-[3.75rem] max-md:min-h-[2.75rem]">
    <p className=" mb-3 text-[#171717] text-opacity-50  font-medium">{label}</p>
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

const PostDetail = ({ post: postProp }) => {
  const mockPostDetail = {
    postId: "#63589",
    title: "HTML",
    author: "Võ Tấn Khoa",
    createdAt: "2023-08-20",
    reviewedAt: "2023-10-20",
    status: 1,
    content: `Khóa học dành cho các bạn học viên có định hướng theo phát triển website phía Backend sử dụng NodeJS và các Framework liên quan.

Yêu cầu chung: Khóa học sẽ dạy từ cơ bản đến nâng cao. Các bạn chỉ cần: chăm chỉ, không ngại hỏi đáp cũng như đưa ra các thắc mắc trong quá trình học tập.

Sau khóa học, các bạn có thể tự tin ứng tuyển vị trí Fresher tại các công ty.`,
    images: [
      "https://picsum.photos/400/300?1",
      "https://picsum.photos/400/300?2",
      "https://picsum.photos/400/300?3",
    ],
  };

  // 👉 Ưu tiên API, fallback mock
  const post = postProp || mockPostDetail;

  return (
    <div className="flex overflow-hidden text-[1.25rem] max-md:text-[1rem] flex-col p-[4rem] bg-white min-h-screen max-md:px-[1.25rem]">
      <div className="flex gap-2.5 items-center justify-end mb-5 text-[1.25rem] max-md:text-[1rem] font-medium leading-none text-white min-w-[15rem]">
        {/* <button
          disabled={!role?.RolePermissions?.includes("admin_edit")}
          className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem] ${
            role?.RolePermissions?.includes("admin_edit")
              ? "bg-[#6C8299] hover:bg-[#55657a]"
              : "bg-[#CDD5DF] cursor-not-allowed"
          }`}
          onClick={() => handlePopup("update")}
        > */}
        <button className="flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem] bg-[#6C8299] hover:bg-[#55657a]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84fdfd4c4d34c64c558acb40d245b2d594b0b0f000c7b4c1dd0353682f135f9d?placeholderIfAbsent=true&apiKey=bb36f631e8e54463aa9d0d8a1339282b"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <span className="gap-2.5 self-stretch my-auto">Cập nhật</span>
        </button>
        {/* <button
              disabled={!role?.RolePermissions?.includes("admin_delete")}
              className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto whitespace-nowrap bg-red-600 rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem] ${
                role?.RolePermissions?.includes("admin_delete")
                  ? "bg-[#DF322B] hover:bg-[#902723]"
                  : "bg-[#ffd1d1] cursor-not-allowed"
              }`}
              onClick={() => handlePopup("delete")}
            > */}
        <button className="flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto whitespace-nowrap rounded-lg min-h-[3.75rem] max-md:min-h-[2.75rem] bg-[#DF322B] hover:bg-[#902723]">
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

        <InfoItem
          label="Ngày gửi"
          value={moment(post.createdAt).format("DD/MM/YYYY")}
        />
        <InfoItem
          label="Ngày duyệt"
          value={moment(post.reviewedAt).format("DD/MM/YYYY")}
        />

        <div>
          <p className="font-medium text-[#171717] text-opacity-50 mb-3">
            Trạng thái
          </p>
          <StatusBadge status={post.status} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <p className=" text-gray-500 mb-2 font-medium">Nội dung</p>
        <div className="border border-[#6C8299]/80 rounded-lg p-4 whitespace-pre-line text-gray-800">
          {post.content}
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex flex-col mt-6 ">
        <p className=" text-gray-500 mb-2 font-medium">Hình ảnh</p>
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
    </div>
  );
};

export default PostDetail;
