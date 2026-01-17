import * as React from "react";

function TableRow({ id, teacher, title, liveTime, status, onClick }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "live":
        return "bg-[#CFF500] text-black w-[180px] text-center";
      case "not_started":
        return "bg-[#FFD75B] text-black w-[180px] text-center";
      case "ended":
        return "bg-[#DF322B] text-white w-[180px] text-center";
      default:
        return "bg-gray-400 text-white w-[180px] text-center";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "live":
        return "Đang live";
      case "not_started":
        return "Chuẩn bị";
      case "ended":
        return "Đã xong";
      default:
        return "Không xác định";
    }
  };

  return (
    <div
      className="flex overflow-hidden flex-wrap mt-3 w-full bg-white text-[#131313] min-h-[3.75rem] 
                 cursor-pointer hover:bg-slate-50"
      onClick={onClick}
    >
      {/* Mã live */}
      <td
        className="flex basis-1/5 justify-center items-center bg-[#EBF1F9]"
      >
        <div className="max-w-[180px] truncate cursor-pointer">
          {id}
        </div>
      </td>

      {/* Giảng viên */}
      <div className="flex basis-1/5 justify-center items-center">
        {teacher}
      </div>

      {/* Nội dung */}
      <div className="flex basis-1/5 justify-center items-center bg-[#EBF1F9]">
         <div className="max-w-[180px] truncate cursor-pointer">
          {title}
        </div>
      </div>

      {/* Thời gian */}
      <div className="flex basis-1/5 justify-center items-center">
        {liveTime}
      </div>

      {/* Trạng thái */}
      <div className="flex basis-1/5 justify-center items-center">
        <div className={`px-3 py-2 rounded-full ${getStatusStyles(status)}`}>
          {getStatusText(status)}
        </div>
      </div>
    </div>
  );
}

export default TableRow;
