import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { CiCircleChevRight } from "react-icons/ci";
import SidebarCollapse from "./SidebarCollapse";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="spinner mt-10"></div>;
  }

  return (
    <div className=" absolute top-0 left-0 ">
      <div className="mobile:visible tablet:hidden transition-all duration-200">
        <SidebarCollapse />
      </div>
    </div>
  );
};

export default Sidebar;
