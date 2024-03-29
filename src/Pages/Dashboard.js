import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center w-screen mx-auto ">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh - 3.5rem)] mobile:min-h-[calc(100vh-3rem)]">
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full mobile:min-h-[calc(100vh-3rem)]">
        <div className="mx-auto w-full py-10 ">
          <Outlet />
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
