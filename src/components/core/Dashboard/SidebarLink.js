import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const SidebarLink = ({ link, iconName, onClick }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink onClick={onClick}
      to={link.path}
      className={` relative px-8 py-2 text-sm font-medium transition-all duration-200  ${
        matchRoute(link.path)
          ? " bg-yellow-800 text-yellow-5"
          : " text-richblack-300 bg-opacity-0"
      }`}
    >
      <span
        className={` absolute left-0 top-0 h-full ml-[1px] w-[0.2rem] bg-yellow-5 transition-all duration-200  rounded-full ${
          matchRoute(link.path) ? " opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex flex-row items-center transition-all duration-200  gap-x-2">
        <Icon className=" text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
