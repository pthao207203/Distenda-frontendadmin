// services/livestream.service.js

// [GET] /admin/livestreams
export const livestreamsService = async (params = "") => {
  try {
    const query = params ? `?${params}` : "";
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams${query}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi lấy danh sách livestream!");
    }

    const responseData = await response.json();
    console.log("livestreamsService => ", responseData);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

// [GET] /admin/livestreams/detail/:LivestreamID
export const livestreamDetailService = async (LivestreamID) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams/detail/${LivestreamID}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi lấy chi tiết livestream!");
    }

    const responseData = await response.json();
    console.log("livestreamDetailService => ", responseData);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

// [POST] /admin/livestreams
export const livestreamCreateService = async (data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi tạo livestream!");
    }

    const responseData = await response.json();
    console.log("livestreamCreateService => ", responseData);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

// [PATCH] /admin/livestreams/edit/:LivestreamID
export const livestreamEditService = async (LivestreamID, data) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams/edit/${LivestreamID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi cập nhật livestream!");
    }

    const responseData = await response.json();
    console.log("livestreamEditService => ", responseData);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

// [POST] /admin/livestreams/change-status/:status/:LivestreamID
export const livestreamChangeStatusService = async (LivestreamID, status) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams/change-status/${status}/${LivestreamID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi đổi trạng thái livestream!");
    }

    const responseData = await response.json();
    console.log("livestreamChangeStatusService => ", responseData);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

// [DELETE] /admin/livestreams/delete/:LivestreamID
export const livestreamDeleteService = async (LivestreamID) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/admin/livestreams/delete/${LivestreamID}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi xoá livestream!");
    }

    const responseData = await response.json();
    console.log("livestreamDeleteService => ", responseData);
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};
