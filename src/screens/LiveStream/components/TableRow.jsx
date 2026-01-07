import * as React from "react";

function TableRow({
  id,
  teacher,
  content,
  liveTime,
  approveTime,
  status,
}) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "live":
        return "bg-[#FFD84D] text-black";
      default:
        return "bg-[#DF322B] text-white";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "live":
        return "Đang live";
      default:
        return "Đã xong";
    }
  };

  return (
    <div className="flex overflow-hidden flex-wrap mt-3 w-full bg-white text-[#131313] min-h-[3.75rem]">
      
      {/* Mã live */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {id}
        </span>
      </div>

      {/* Tên giảng viên */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center">
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {teacher}
        </span>
      </div>

      {/* Nội dung live */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center bg-[#EBF1F9]">
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {content}
        </span>
      </div>

      {/* Thời gian live */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center">
        <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
          {liveTime}
        </span>
      </div>

      {/* Trạng thái */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center">
        <div
          className={`self-center shrink w-[90%] px-3 py-2 flex justify-center items-center min-h-[2.5rem] rounded-[6.25rem] ${getStatusStyles(
            status
          )}`}
        >
          <span className="text-center text-[1.25rem] max-md:text-[1rem] font-medium truncate">
            {getStatusText(status)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TableRow;
