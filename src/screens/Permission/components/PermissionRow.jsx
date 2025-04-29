import React, { useState, useEffect } from "react";

export default function PermissionRow({
  index,
  permission,
  isFirst,
  roles,
  onPermissionChange,
}) {
  // console.log(index, permission)
  const getPermission = (permission) => {
    switch (permission) {
      case 0:
        return "Xem";
      case 1:
        return "Thêm";
      case 2:
        return "Sửa";
      default:
        return "Xoá";
    }
  };
  // Tạo state để lưu trạng thái của các checkbox
  const [checkboxStates, setCheckboxStates] = useState(
    Array(roles.length).fill(false) // Khởi tạo mảng trạng thái cho tất cả checkbox, mặc định là `false`
  );
  // console.log(checkboxStates)

  useEffect(() => {
    // Cập nhật trạng thái checkbox dựa trên quyền của các roles
    roles.forEach((role, index) => {
      if (role.RolePermissions.includes(permission)) {
        setCheckboxStates((prevState) => {
          const newState = [...prevState];
          newState[index] = true; // Đánh dấu checkbox là checked
          return newState;
        });
      }
    });
  }, []);

  // Hàm xử lý khi thay đổi trạng thái checkbox
  const handleCheckboxChange = (roleIndex) => {
    const updatedStates = [...checkboxStates];
    // console.log("checkboxStates", updatedStates)
    updatedStates[roleIndex] = !updatedStates[roleIndex]; // Đảo trạng thái checkbox
    console.log("checkboxStates", updatedStates);
    setCheckboxStates(updatedStates);
    console.log("checkboxStates", checkboxStates);

    // Gửi dữ liệu về `PermissionTable`
    const roleId = roles[roleIndex]._id; // Lấy `roleId` chính xác
    onPermissionChange(roleId, permission, updatedStates[roleIndex]);
  };

  return (
    <div
      className={`flex overflow-hidden flex-wrap mt-3 w-full bg-white text-[#171717] min-h-[3.75rem] cursor-pointer ${
        !isFirst ? "mt-[0.375rem]" : ""
      }`}
    >
      {/* Ô hiển thị thông tin permission */}
      <div className="flex basis-1/5 min-w-0 justify-center items-center p-3 bg-[#EBF1F9]">
        <div className="gap-2.5 self-stretch my-auto">
          {getPermission(index)}
        </div>
      </div>

      {/* Các ô chứa checkbox */}
      {checkboxStates.map((isChecked, index) => (
        <div
          key={index}
          className="flex basis-1/5 min-w-0 justify-center items-center p-3"
        >
          <div className="flex justify-center items-center w-full relative">
            {/* Checkbox chính */}
            {isChecked ? (
              <>
                <input
                  type="checkbox"
                  checked={isChecked} // Liên kết trạng thái với state
                  onChange={() => handleCheckboxChange(index)} // Gọi hàm khi thay đổi trạng thái
                  className={`w-5 h-5 cursor-pointer appearance-none rounded-[4px] border border-gray-300 bg-[#6C8299]`} // Hiển thị màu bên trong checkbox
                />
                <img
                  src={`${process.env.PUBLIC_URL}/icons/check.svg`}
                  alt="Checked"
                  className="absolute w-4 h-4 pointer-events-none" // Không chặn sự kiện click
                />
              </>
            ) : (
              <input
                type="checkbox"
                checked={isChecked} // Liên kết trạng thái với state
                onChange={() => handleCheckboxChange(index)} // Gọi hàm khi thay đổi trạng thái
                className={`w-5 h-5 cursor-pointer appearance-none rounded-[4px] border border-gray-300 bg-white`} // Hiển thị màu bên trong checkbox
              />
            )}
            {/* <input
              type="checkbox"
              checked={isChecked} // Liên kết trạng thái với state
              onChange={() => handleCheckboxChange(index)} // Gọi hàm khi thay đổi trạng thái
              className={`w-5 h-5 cursor-pointer appearance-none rounded-[4px] border border-gray-300 ${isChecked ? "bg-[#6C8299]" : "bg-white"
                }`} // Hiển thị màu bên trong checkbox
            /> */}
            {/* Hiển thị hình ảnh khi checkbox được tick */}
            {/* {isChecked && (
              <img
                src={`${process.env.PUBLIC_URL}/icons/check.svg`}
                alt="Checked"
                className="absolute w-4 h-4 pointer-events-none" // Không chặn sự kiện click
              />
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}
