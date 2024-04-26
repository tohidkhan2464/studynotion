import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
// import { CiCircleChevRight } from "react-icons/ci";
import SidebarCollapse from "./SidebarCollapse";
import GetWindowSize from "../../../hooks/getWindowSize";

const Sidebar = () => {
  const size = GetWindowSize();

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return <div className="spinner mt-[20rem] ml-[41rem]"></div>;
  }

  return (
    <div className=" absolute top-0 left-0 ">
      <div className="transition-all relative duration-200">
        {size.width <= 1200 ? (
          <SidebarCollapse />
        ) : !confirmationModal ? (
          <div className="transition-all duration-200  relative mobile:min-h-[calc(100vh-3rem)] min-h-[calc(100vh-3.5rem)]">
            <div className="fixed flex laptop:min-w-[200px] desktop:min-w-[222px] flex-col border-r-[1px] border-richblack-700 transition-all duration-200 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
              <div className="flex flex-col">
                {sidebarLinks.map((link) => {
                  if (link.type && user?.accountType !== link.type) return null;
                  return (
                    <SidebarLink
                      link={link}
                      iconName={link.icon}
                      key={link.id}
                    />
                  );
                })}
              </div>

              <div className="mx-auto mt-6 mv-6 h-[1px] w-10/12 bg-richblack-700 "></div>

              <div className="flex flex-col">
                <SidebarLink
                  link={{ name: "Settings", path: "/dashboard/settings" }}
                  iconName={"VscSettingsGear"}
                />

                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Are Your Sure ?",
                      text2: "You will be logged out of your Account",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      btn1Handler: () => dispatch(logout(navigate)),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                  className="text-sm font-medium text-richblack-300"
                >
                  <div className="flex px-8 py-2 items-center gap-x-2">
                    <VscSignOut className="text-lg" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          confirmationModal && (
            <div className="h-[100vh] z-10 w-screen ">
              <ConfirmationModal modalData={confirmationModal} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
