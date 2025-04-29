import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Cookies from "js-cookie";

const Main = () => {
  let token = Cookies.get("token");
  console.log("token", token);
  // Hàm xử lý toggle TaskBar
  // const handleTaskBarToggle = () => {
  //   setIsTaskBarVisible((prev) => !prev); // Đảo trạng thái hiển thị TaskBar
  // };

  return (
    <div className="flex overflow-hidden flex-col justify-start leading-none bg-white w-screen h-screen">
      <Header />
      <div className="flex flex-wrap grow justify-center items-center ">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
