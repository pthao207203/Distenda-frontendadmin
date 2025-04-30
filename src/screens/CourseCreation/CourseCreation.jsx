import React, { useEffect } from "react";
// import Header from './Header';
// import NavigationBar from "./NavigationBar";
import CourseForm from "./CourseForm";
import { useRole } from "../../layouts/AppContext";
import { useNavigate } from "react-router-dom";

function CourseCreationPage() {
  const { role, user } = useRole();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      role &&
      !role?.RolePermissions?.includes("course_create") &&
      !role?.RolePermissions?.includes("course_only")
    ) {
      console.log("Không có quyền, chuyển về trang chủ");
      navigate("/courses");
    }
  }, [navigate, role]);
  return (
    <div className="flex overflow-hidden flex-col bg-[#EBF1F9]">
      {/* <Header /> */}
      {/* <NavigationBar /> */}
      <CourseForm role={role} user={user} />
    </div>
  );
}

export default CourseCreationPage;
