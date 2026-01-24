import * as React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function ForumTableRow(post) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/forum/post/detail/${post?._id}`); // Điều hướng đến trang CourseDetailsPage với ID khóa học
  };

  const statusClass =
    post?.PostStatus === 1 ? "bg-[#D1F669] text-[#131313]" : post?.PostStatus === 0 ? "bg-[#DF322B] text-white" : "bg-[#FFD75B] text-[#131313]";
  const statusText =
    post?.PostStatus === 1 ? "Đã duyệt" : post?.PostStatus === 0 ? "Đã hủy" : "Chờ duyệt";

  return (
    <article
      className="flex overflow-hidden flex-wrap mt-3 w-full bg-white min-h-[3.75rem] max-md:min-h-[2.75rem] cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleRowClick}
    >
      {/* Mã bài đăng */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium px-3 truncate">
          {post?.postId.toUpperCase()}
        </span>
      </div>

      {/* Tên người dùng */}
      <div className="flex basis-1/6 min-w-0 p-3 justify-center items-center">
        <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">{post?.userFullName || "Không có"}</span>
      </div>

      {/* Tiêu đề bài đăng */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
          {post?.postTitle}
        </span>
      </div>

      {/* Thời gian đăng */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center">
        <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
          {moment(post.createdBy.createdAt).format("DD/MM/YYYY hh:mm:ss")}
        </span>
      </div>

      {/* Thời gian duyệt */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-[#131313] text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
          {moment(post.reviewedBy.reviewedAt).format("DD/MM/YYYY hh:mm:ss")}
        </span>
      </div>

      {/* Trạng thái */}
      <div className="flex basis-1/6 min-w-0 justify-center items-center">
        <div
          className={`self-center shrink w-[90%] max-w-full px-4 py-2 rounded-[99px] border-2 justify-center items-center inline-flex ${statusClass} text-center`}
        >
          <span className="text-center md:text-[1.25rem] text-[1rem] font-medium truncate">
            {statusText}
          </span>
        </div>
      </div>
    </article>
  );
}


export default ForumTableRow;
