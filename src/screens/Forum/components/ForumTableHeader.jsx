import React from "react";

function ForumTableHeader() {
  return (
    <div className="flex shrink overflow-hidden w-full rounded-t-3xl mt-3 bg-[#6C8299] min-h-[3.75rem] max-md:min-h-[2.75rem] max-md:max-w-full">
      {/* Mã bài đăng */}
      <div className="flex basis-1/6 min-w-0 px-[0.25rem] justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Mã bài đăng</span>
      </div>

      {/* Tên người dùng */}
      <div className="flex basis-1/6 min-w-0 px-[0.25rem] justify-center items-center text-white">
        <span className="text-center">Tên người dùng</span>
      </div>

      {/* Tiêu đề bài đăng */}
      <div className="flex basis-1/6 min-w-0 px-[0.25rem] justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Tiêu đề bài đăng</span>
      </div>

      {/* Thời gian đăng */}
      <div className="flex basis-1/6 min-w-0 px-[0.25rem] justify-center items-center text-white">
        <span className="text-center">Thời gian đăng</span>
      </div>

      {/* Thời gian duyệt */}
      <div className="flex basis-1/6 min-w-0 px-[0.25rem] justify-center items-center bg-[#EBF1F9]">
        <span className="text-center">Thời gian duyệt</span>
      </div>

      {/* Dropdown Trạng thái */}
      <div className="relative flex basis-1/6 min-w-0 px-[0.25rem] justify-center items-center text-white">
        <span className="text-center">Trạng thái</span>
      </div>
    </div>
  );
}

export default ForumTableHeader;
