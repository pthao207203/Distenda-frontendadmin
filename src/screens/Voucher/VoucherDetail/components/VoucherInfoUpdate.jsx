import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopupConfirm } from "../../../../components/PopupConfirm";
import { PopupConfirmCancel } from "../../../../components/PopupConfirmCancel";
import { voucherUpdatePostService, voucherDeleteService } from "../../../../services/voucher.service";

const VoucherInfoUpdate = ({
    voucher
  }) => {
    const navigate = useNavigate();
    const [popupType, setPopupType] = useState(null);
    const [voucherData, setVoucherData] = useState({
      voucherCode: voucher.voucherCode,
      discountPercentage: voucher.discountPercentage,
      minAmount: voucher.minAmount,
      discountAmount: voucher.discountAmount,
    });

    const [loading, setLoading] = useState(false);

    const handlePopup = (type) => {
      setPopupType(type);
    };

    const handleClosePopup = () => {
      setPopupType(null);
    };

    const handleConfirm = async () => {
      handleClosePopup();

      if (popupType === "update") {
        setLoading(true);
        try {
          const res = await voucherUpdatePostService(voucher._id, voucherData);
          setLoading(false);
          if (res.success) {
            alert("Cập nhật voucher thành công!");
          }
        } catch (error) {
          setLoading(false);
          alert("Lỗi khi kết nối server!");
        }
      }

      if (popupType === "cancel") {
        setLoading(true);
        try {
          const res = await voucherDeleteService(voucher._id);
          setLoading(false);
          if (res.code === 200) {
            // Navigate to the voucher list page
            navigate("/voucher", { state: { deletedVoucherId: voucher._id } });
          }
        } catch (error) {
          setLoading(false);
          alert("Lỗi khi kết nối server khi xóa!");
        }
      }
    };

  return (
    <section>
      <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto basis-6 min-w-60 max-md:max-w-full">
          <div className="flex flex-wrap gap-3 items-start w-full text-lg font-semibold text-[#13131380] max-md:max-w-full">
            <p>Lần cuối cập nhật</p>
            <span className="flex shrink-0 w-6 h-6" />
          </div>
          <p className="mt-4 text-xl font-medium text-neutral-900 max-md:max-w-full">
            {voucher.lastUpdated}
          </p>
        </div>

        <ActionButton
          label="Cập nhật"
          bgColor="bg-[#6C8299]"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/84fdfd4c4d34c64c558acb40d245b2d594b0b0f000c7b4c1dd0353682f135f9d"
          onClick={() => handlePopup("update")}
        />
        <ActionButton
          label="Xóa"
          bgColor="bg-red-600"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/39a71fd8008a53a09d7a877aea83770214d261a5f742c728f7c5a0a06accb635"
          onClick={() => handlePopup("cancel")}
        />
      </div>

      <VoucherDetails voucherData={voucherData} setVoucherData={setVoucherData} />

      {popupType === "update" && (
        <PopupConfirm
          isVisible={true}
          content={loading ? "Đang cập nhật..." : "Bạn có chắc chắn muốn cập nhật voucher này?"}
          onClose={handleClosePopup}
          onConfirm={handleConfirm}
        />
      )}

      {popupType === "cancel" && (
        <PopupConfirmCancel
          isVisible={true}
          content={loading ? "Đang xóa..." : "Bạn có chắc chắn muốn xóa voucher này?"}
          onClose={handleClosePopup}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
};

const ActionButton = ({ label, bgColor, icon, onClick }) => {
  return (
    <button
      className={`flex gap-3 justify-center items-center self-stretch px-3 py-3 my-auto text-xl font-medium leading-none text-white rounded-lg ${bgColor} min-h-[46px]`}
      onClick={onClick}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
      <span className="gap-2.5 self-stretch my-auto">{label}</span>
    </button>
  );
};

const VoucherDetails = ({ voucherData, setVoucherData }) => {
  return (
    <div className="mt-10 w-full text-xl max-md:max-w-full">
      <h3 className="font-semibold text-neutral-900 max-md:max-w-full">Thông tin voucher</h3>
      <div className="mt-8 w-full font-medium leading-none max-md:max-w-full">
        <div className="flex flex-wrap gap-10 items-start w-full max-md:max-w-full">
          <FormField label="Mã Voucher" name="voucherCode" value={voucherData.voucherCode} setVoucherData={setVoucherData} />
          <FormField label="Giảm giá (%)" name="discountPercentage" value={voucherData.discountPercentage} setVoucherData={setVoucherData} />
        </div>
        <div className="flex flex-wrap gap-10 items-start mt-8 w-full max-md:max-w-full">
          <FormField label="Tối thiểu" name="minAmount" value={voucherData.minAmount} setVoucherData={setVoucherData} />
          <FormField label="Giới hạn" name="discountAmount" value={voucherData.discountAmount} setVoucherData={setVoucherData} />
        </div>
      </div>
    </div>
  );
};

const FormField = ({
    label,
    name,
    value,
    setVoucherData
  }) => {
    const handleChange = (e) => {
      const newValue = e.target.value;
      setVoucherData(prev => ({
        ...prev,
        [name]: newValue
      }));
    };

  return (
    <div className="flex-1 shrink basis-0 min-h-[91px] min-w-60 max-md:max-w-full">
      <label className="text-[#13131380] max-md:max-w-full">{label}</label>
      <div className="flex-1 shrink gap-1.5 self-stretch p-2.5 mt-3 whitespace-nowrap rounded-lg border border-3 basis-0 border-[#6C8299] border-opacity-80 size-full w-[30rem] h-[4.25rem] text-[#131313] max-md:max-w-full">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full h-full outline-none border-none text-[#131313]"
        />
      </div>
    </div>
  );
};

export default VoucherInfoUpdate;
