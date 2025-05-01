import * as React from "react";
// import { Header } from "./components/Header";
// import { NavigationBar } from "./components/NavigationBar";
import { CourseForm } from "./components/CourseForm";
import { useRole } from "../../layouts/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseBuilder() {
  const { role } = useRole();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      role &&
      !role?.RolePermissions?.includes("course_edit") &&
      !role?.RolePermissions?.includes("course_only")
    ) {
      console.log("Không có quyền, chuyển về trang chủ");
      navigate("/courses");
    }
  }, [navigate, role]);
  return (
    <main className="flex overflow-hidden flex-col leading-none bg-[#EBF1F9]">
      {/* <Header /> */}
      {/* <NavigationBar /> */}
      <CourseForm />
    </main>
  );
}
