import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="h-screen w-screen mx-auto my-auto">
        <div className="spinner "></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh - 3.5rem)]">
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
        <div className="mx-auto w-full py-10 ">
          <Outlet />
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
