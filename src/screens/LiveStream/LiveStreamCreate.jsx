import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopupSuccess } from "../../components/PopupSuccess";
import { PopupError } from "../../components/PopupError";
import ActionButton from "./components/ActionButton";
import { Link } from "react-router-dom";

function LiveStreamCreate({ setLoadingPopup }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    InstructorName: "",
    LiveTitle: "",
    LiveDescription: "",
  });

  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoadingPopup(true);

      console.log("LiveStream data:", data);

      // Gọi API tạo livestream
      // const result = await livestreamCreateController(data);

      // giả lập success
      const result = { code: 200 };

      if (result.code === 200) {
        setSuccessPopupVisible(true);
      } else {
        setErrorPopupVisible(true);
      }
    } catch (err) {
      setErrorPopupVisible(true);
    } finally {
      setLoadingPopup(false);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    navigate("/livestream");
  };

  const closeErrorPopup = () => {
    setErrorPopupVisible(false);
  };

  return (
    <>
      <form className="flex flex-col px-16 py-8 w-full bg-white max-md:px-5">
        <Link to="/livestream/streaming">
            <ActionButton />
          </Link>

        {/* Tên giảng viên */}
        <div className="flex flex-col mb-5">
          <label htmlFor="InstructorName" className="font-medium">
            Tên giảng viên <span className="text-red-600">*</span>
          </label>
          <input
            id="InstructorName"
            type="text"
            required
            className="mt-2 px-4 h-[3rem] rounded-lg border border-slate-400"
            onChange={handleChange}
          />
        </div>

        {/* Tiêu đề */}
        <div className="flex flex-col mb-5">
          <label htmlFor="LiveTitle" className="font-medium">
            Tiêu đề livestream <span className="text-red-600">*</span>
          </label>
          <input
            id="LiveTitle"
            type="text"
            required
            className="mt-2 px-4 h-[3rem] rounded-lg border border-slate-400"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="LiveTitle" className="font-medium">
            Thời gian LiveStream <span className="text-red-600">*</span>
          </label>
          <input
            id="LiveTime"
            type="text"
            required
            className="mt-2 px-4 h-[3rem] rounded-lg border border-slate-400"
            onChange={handleChange}
          />
        </div>

        {/* Mô tả */}
        <div className="flex flex-col mb-8">
          <label htmlFor="LiveDescription" className="font-medium">
            Mô tả
          </label>
          <textarea
            id="LiveDescription"
            rows={5}
            className="mt-2 px-4 py-3 rounded-lg border border-slate-400 resize-none"
            onChange={handleChange}
          />
        </div>
        
      </form>

      {/* Popup */}
      <PopupSuccess
        isVisible={successPopupVisible}
        message="Tạo livestream thành công!"
        onClose={closeSuccessPopup}
      />

      <PopupError
        isVisible={errorPopupVisible}
        message="Tạo livestream thất bại. Vui lòng thử lại!"
        onClose={closeErrorPopup}
      />
    </>
  );
}

export default LiveStreamCreate;
