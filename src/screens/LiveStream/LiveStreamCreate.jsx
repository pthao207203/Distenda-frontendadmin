import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PopupSuccess } from "../../components/PopupSuccess";
import { PopupError } from "../../components/PopupError";
import ActionButton from "./components/ActionButton";

import {
  livestreamCreateController,
  livestreamDetailController,
  livestreamEditController,
  livestreamDeleteController,
} from "../../controllers/livestream.controller";

function LiveStreamCreate({ }) {
  const navigate = useNavigate();
  const { LivestreamID } = useParams();
  const isEditMode = !!LivestreamID;
  const [loading, setLoading] = useState(false);


  const [data, setData] = useState({
    LivestreamTitle: "",
    LivestreamDescription: "",
    LivestreamStartedAt: "",
  });

  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);

  // 🔹 Load data khi EDIT
  useEffect(() => {
    if (!isEditMode) return;

    const fetchDetail = async () => {
      const res = await livestreamDetailController(LivestreamID);
      if (res?.code === 200) {
        setData({
          LivestreamTitle: res.data.LivestreamTitle || "",
          LivestreamDescription: res.data.LivestreamDescription || "",
          LivestreamStartedAt: res.data.LivestreamStartedAt
            ? new Date(res.data.LivestreamStartedAt).toISOString().slice(0, 16)
            : "",

        });
      }
    };

    fetchDetail();
  }, [LivestreamID, isEditMode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  // 🔹 CREATE / UPDATE
  const handleSubmit = async () => {
    try {

      const result = isEditMode
        ? await livestreamEditController(
          setLoading,
          LivestreamID,
          {
            LivestreamTitle: data.LivestreamTitle,
            LivestreamDescription: data.LivestreamDescription,
          }
        )
        : await livestreamCreateController(setLoading, {
          LivestreamTitle: data.LivestreamTitle,
          LivestreamDescription: data.LivestreamDescription,
          LivestreamStartedAt: data.LivestreamStartedAt,
        });

      if (result?.code === 200) {
        setSuccessPopupVisible(true);
      } else {
        setErrorPopupVisible(true);
      }
    } catch {
      setErrorPopupVisible(true);
    } finally {

    }
  };

  // 🔹 DELETE
  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xoá livestream này?")) return;

    try {
      const result = await livestreamDeleteController(
        setLoading,
        LivestreamID
      );

      if (result?.code === 200) {
        setDeleteSuccessVisible(true);   // 👈 HIỆN POPUP
      } else {
        setErrorPopupVisible(true);
      }
    } catch (error) {
      setErrorPopupVisible(true);
    }
  };


  return (
    <>
      <form className="flex flex-col px-16 py-8 w-full bg-white">
        {/* ACTION BUTTON */}
        <div className="flex gap-2 justify-end mb-6">
          {!isEditMode && (
            <ActionButton
              label="Tạo Livestream"
              bgColor="bg-[#6C8299] hover:bg-[#55657a]"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b78a7b0bea08f365ad78bb218941e4d8e9e9ff8cd391ee696af50d042524edd2?placeholderIfAbsent=true&apiKey=66913a0089c7476296e0d5e235a1975e"
              onClick={handleSubmit}
            />
          )}

          {isEditMode && (
            <>
              <ActionButton
                label="Cập nhật"
                bgColor="bg-[#6C8299]"
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/84fdfd4c4d34c64c558acb40d245b2d594b0b0f000c7b4c1dd0353682f135f9d"
                onClick={handleSubmit}
              />
              <ActionButton
                label="Xóa"
                bgColor="bg-[#DF322B]"
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/39a71fd8008a53a09d7a877aea83770214d261a5f742c728f7c5a0a06accb635"
                onClick={handleDelete}
              />
            </>
          )}
        </div>

        {/* FORM */}
        {/* Tiêu đề */}
        <div className="flex flex-col mb-5">
          <label>Tiêu đề livestream *</label>
          <input
            id="LivestreamTitle"
            value={data.LivestreamTitle}
            onChange={handleChange}
            className="mt-2 px-4 h-[3rem] border rounded-lg"
          />
        </div>

        {/* Thời gian live */}
        <div className="flex flex-col mb-5">
          <label>Thời gian livestream *</label>
          <input
            id="LivestreamStartedAt"
            type="datetime-local"
            value={data.LivestreamStartedAt}
            onChange={handleChange}
            className="mt-2 px-4 h-[3rem] border rounded-lg"
          />
        </div>

        {/* Mô tả */}
        <div className="flex flex-col mb-8">
          <label>Mô tả</label>
          <textarea
            id="LivestreamDescription"
            value={data.LivestreamDescription}
            onChange={handleChange}
            rows={5}
            className="mt-2 px-4 py-3 border rounded-lg"
          />
        </div>
      </form>

      <PopupSuccess
        isVisible={successPopupVisible}
        message={isEditMode ? "Cập nhật thành công!" : "Tạo livestream thành công!"}
        onClose={() => navigate("/livestream")}
      />

      <PopupError
        isVisible={errorPopupVisible}
        message="Thao tác thất bại. Vui lòng thử lại!"
        onClose={() => navigate("/livestream")}
      />
      
      <PopupSuccess
        isVisible={deleteSuccessVisible}
        message="Xoá livestream thành công!"
        onClose={() => navigate("/livestream")}
      />
    </>
  );
}

export default LiveStreamCreate;
