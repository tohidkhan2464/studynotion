import React, { useRef, useState } from "react";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CiCircleChevRight } from "react-icons/ci";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";
import { CiCircleChevLeft } from "react-icons/ci";
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";

const SidebarCollapse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  if (profileLoading || authLoading) {
    return <div className="spinner mt-10"></div>;
  }

  if (!user) return null;
  return (
    <button
      className="relative"
      onClick={(event) => {
        setOpen(true);
        event.stopPropagation();
      }}
      ref={ref}
    >
      {!open && (
        <div className=" flex justify-end w-full relative cursor-pointer gap-x-1 transition-all duration-200 ">
          <CiCircleChevRight className="text-4xl absolute -left-1 z-[10] bg-richblack-600 p-1 rounded-full transition-all duration-200 top-8 text-richblack-5" />
        </div>
      )}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="transition-all duration-200  mobile:min-h-[calc(100vh-3rem)] min-h-[calc(100vh-3.5rem)]"
        >
          <div className="fixed flex min-w-[222px] flex-col border-r-[1px] border-richblack-700 transition-all duration-200 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
            <button className="relative" onClick={() => setOpen(false)}>
              <div className=" flex justify-end w-full relative cursor-pointer gap-x-1 transition-all duration-200 ">
                <CiCircleChevLeft className="text-4xl absolute left-[13rem] z-[10] bg-richblack-600 p-1 transition-all duration-200 rounded-full -top-2 text-richblack-5" />
              </div>
            </button>
            <div className="flex flex-col">
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null;
                return (
                  <SidebarLink
                    link={link}
                    iconName={link.icon}
                    key={link.id}
                    ref={ref}
                    onClick={(event) => {
                      setOpen(false);
                      event.stopPropagation();
                    }}
                  />
                );
              })}
            </div>

            <div className="mx-auto mt-6 mv-6 h-[1px] w-10/12 bg-richblack-700 "></div>

            <div className="flex flex-col">
              <SidebarLink
                ref={ref}
                onClick={(event) => {
                  setOpen(false);
                  event.stopPropagation();
                }}
                link={{ name: "Settings", path: "/dashboard/settings" }}
                iconName={"VscSettingsGear"}
              />

              <button
                onClick={(event) => {
                  setConfirmationModal({
                    text1: "Are Your Sure ?",
                    text2: "You will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  });
                  setOpen(false);
                  event.stopPropagation();
                }}
                ref={ref}
                className="text-sm font-medium text-richblack-300"
              >
                <div className="flex px-8 py-2 items-center gap-x-2" ref={ref}>
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </button>
  );
};

export default SidebarCollapse;
