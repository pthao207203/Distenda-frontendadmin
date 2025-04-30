import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VoucherRow = ({ id, index, voucher, isDeleted = false }) => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);

  if (!voucher) return null;;

  const {
    voucherCode = "Chưa có mã",
    minAmount = 0,
    discountPercentage = 0,
    discountAmount = 0,
    status = -1,
  } = voucher;

  const handleEdit = () => {
    navigate(`/voucher/detail/${id}`);
  };

  const toggleVisibility = (e) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  const getStatusStyles = (status) => {
    if (status === 1) return { bgColor: "bg-[#D1F669]", text: "Hoạt động" };
    if (status === 0) return { bgColor: "bg-[#FFD75B]", text: "Tạm dừng" };
    return { bgColor: "bg-gray-300", text: "Không xác định" };
  };

  const statusInfo = getStatusStyles(status);

  return (
    <div
      className="flex overflow-hidden flex-wrap mt-3 w-full bg-white min-h-[70px] cursor-pointer max-md:max-w-full"
      onClick={handleEdit}
    >
      <Cell bg="bg-[#EBF1F9]" content={index + 1} />
      <Cell content={voucherCode} />
      <Cell bg="bg-[#EBF1F9]" content={minAmount} />
      <Cell content={`${discountPercentage}%`} />
      <Cell bg="bg-[#EBF1F9]" content={discountAmount} />
      <div className="flex basis-1/6 min-w-0 shrink justify-center items-center px-3 min-h-[70px] max-md:max-w-full">
        <button
          className={`flex w-full justify-center items-center px-4 py-2 rounded-[99px] ${statusInfo.bgColor}`}
          onClick={toggleVisibility}
        >
          <div className="text-[#131313] text-center text-xl font-medium truncate">
            {statusInfo.text}
          </div>
        </button>
      </div>
    </div>
  );
};

// Component Cell tái sử dụng
const Cell = ({ bg = "", content }) => (
  <div className={`flex basis-1/6 min-w-0 min-h-[70px] justify-center items-center px-3 ${bg}`}>
    <div className="text-[#131313] text-center text-xl font-medium truncate">
      {content}
    </div>
  </div>
);

export default VoucherRow;
