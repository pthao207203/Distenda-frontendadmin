import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { voucherCreatePostController } from "../../../../controllers/voucher.controller.js";
import { courseGetAllController } from "../../../../controllers/course.controller.js";
import { PopupConfirmCancel } from "../../../../components/PopupConfirmCancel";
import { PopupSuccess } from "../../../../components/PopupSuccess";
import { PopupError } from "../../../../components/PopupError";

const VoucherInfo = () => {
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState({});
  const [course, setCourse] = useState([]);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const result = await courseGetAllController();
      if (result) {
        setCourse([
          { _id: "", CourseName: "Chọn khoá học", disabled: true },
          ...result,
        ]);
      }
    }
    fetchCourses();
  }, []);

  const handleChange = (field, value) => {
    setVoucher((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAction = async (action) => {
    if (action === "save") {
      const payload = {
        voucherCode: voucher?.voucherCode,
        discountPercentage: Number(voucher?.discountPercentage),
        minAmount: Number(voucher?.minAmount),
        discountAmount: Number(voucher?.discountAmount),
        courseId: voucher?.VoucherCourse,
      };

      try {
        const result = await voucherCreatePostController(payload);
        if (result?.code === 200) {
          setSuccessPopupVisible(true);
          navigate("/voucher", { state: { newVoucher: result.voucher } });
        } else {
          setErrorPopupVisible(true);
        }
      } catch (err) {
        console.error("❌ API Error:", err);
        setErrorPopupVisible(true);
      }
    } else if (action === "cancel") {
      setPopupContent(
        <>
          Bạn có muốn hủy tạo voucher mới?
          <br />
          Voucher mới sẽ không được lưu.
        </>
      );
      setPopupVisible(true);
    }
  };

  const handlePopupConfirm = () => {
    setPopupVisible(false);
    navigate("/voucher");
  };

  const handlePopupClose = () => setPopupVisible(false);
  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    navigate("/voucher");
  };
  const closeErrorPopup = () => setErrorPopupVisible(false);

  return (
    <section>
      <div className="flex gap-[0.5rem] items-start self-end text-xl font-semibold leading-none text-white max-md:max-w-full">
        <ActionButton
          label="Lưu"
          bgColor="bg-[#6C8299]"
          onClick={() => handleAction("save")}
        />
        <ActionButton
          label="Hủy"
          bgColor="bg-[#DF322B]"
          onClick={() => handleAction("cancel")}
        />
      </div>

      <div className="flex flex-col mt-[2.5rem] w-full text-xl max-md:max-w-full">
        <h3 className="font-semibold text-[#171717] max-md:max-w-full">Thông tin voucher</h3>

        <div className="flex flex-col mt-[1.5rem] w-full font-medium leading-none max-md:max-w-full">
          <div className="flex flex-wrap gap-[4rem] items-start w-full">
            <FormField
              label="Mã Voucher"
              value={voucher?.voucherCode}
              onChange={(val) => handleChange("voucherCode", val)}
            />
            <FormField
              label="Giảm giá (%)"
              value={voucher?.discountPercentage}
              onChange={(val) => handleChange("discountPercentage", val)}
            />
          </div>

          <div className="flex flex-wrap gap-[4rem] items-start mt-6 w-full">
            <FormField
              label="Tối thiểu"
              value={voucher?.minAmount}
              onChange={(val) => handleChange("minAmount", val)}
            />
            <FormField
              label="Giới hạn"
              value={voucher?.discountAmount}
              onChange={(val) => handleChange("discountAmount", val)}
            />
          </div>

          {/* Chọn khoá học */}
          <div className="flex flex-col mt-6 w-full max-md:max-w-full">
            <label
              htmlFor="VoucherCourse"
              className="text-[#13131380] pb-2"
            >
              Khoá học
            </label>
            <div className="flex items-start px-2.5 py-4 mt-2 w-full rounded-lg border border-slate-500 border-opacity-80 text-[#131313]">
              <select
                id="VoucherCourse"
                value={voucher?.VoucherCourse || ""}
                onChange={(e) => handleChange("VoucherCourse", e.target.value)}
                className="flex-1 bg-transparent border-none outline-none"
              >
                {course.map((option, index) => (
                  <option
                    key={index}
                    value={option._id}
                    disabled={option.disabled}
                  >
                    {option.CourseName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      <PopupConfirmCancel
        isVisible={isPopupVisible}
        content={popupContent}
        confirm="Huỷ"
        onConfirm={handlePopupConfirm}
        onCancel={handlePopupClose}
      />
      <PopupSuccess
        isVisible={successPopupVisible}
        message="Cập nhật thành công!"
        onClose={closeSuccessPopup}
      />
      <PopupError
        isVisible={errorPopupVisible}
        message="Cập nhật thất bại. Vui lòng thử lại sau!"
        onClose={closeErrorPopup}
      />
    </section>
  );
};

const ActionButton = ({ label, bgColor, onClick }) => {
  return (
    <button
      onClick={() => {
        onClick && onClick();
      }}
      className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto whitespace-nowrap rounded-lg min-h-[3rem] max-md:min-h-[2rem] ${bgColor}`}
    >
      <span className="gap-2.5 self-stretch my-auto">{label}</span>
    </button>
  );
};

const FormField = ({ label, value, onChange }) => {
  return (
    <div className="flex-1 min-w-[15rem] max-w-[40rem]">
      <label className="text-[#13131380]">{label}</label>
      <div className="p-2.5 mt-3 rounded-lg border border-[#6C8299] border-opacity-80 w-full h-[4.25rem]">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full outline-none border-none text-[#131313] bg-transparent"
        />
      </div>
    </div>
  );
};

export default VoucherInfo;
