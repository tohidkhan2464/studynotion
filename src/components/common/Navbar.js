import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Home_items/Logo.svg";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import  PiShoppingCartSimpleLight  from "../../assets/Home_items/fi-rr-shopping-cart.svg";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/api";
// import axios from 'axios'
import { apiConnector } from "../../services/apiConnector";
import { IoIosArrowDropdown } from "react-icons/io";

const Navbar = () => {
  
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      // const url = "http://localhost:4000/api/v1/course/showAllCategories";
      // const result = await fetch(url)
      // .then((response) =>{
      //   return response.json();
      // }).then((data) => {
      //   console.log("data", data);
      // })
      const result = await apiConnector({
        method: "GET",
        url: categories.CATEGORIES_API,
      });
      
      console.log("Printing sublinks result", result);
      setSubLinks(result.data.data);

      console.log("SubLinks ", subLinks);
    } catch (error) {
      console.log("Error ", error);
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-2 border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo Image */}
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((links, index) => {
              return (
                <li key={index}>
                  {links.title === "Catalog" ? (
                    <div className="flex gap-1  items-center relative group">
                      <p>{links.title}</p>
                      <IoIosArrowDropdown />

                      <div
                        className=" invisible absolute left-[50%] top-0 flex flex-col rounded-md bg-richblack-5 p-2
                      text-richblack-900 opacity-0 transition-all duration-500 z-10
                       group-hover:visible group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[30%]"
                      >
                        <div className=" absolute left-[50%] translate-x-[60%] -top-2 h-6 w-6 rotate-45 rounded bg-richblack-5 -z-10"></div>
                        {subLinks.length ? (
                          subLinks.map((sublink, index) => (
                            <Link to={`${sublink.name}`} key={index}>
                              <div className=" hover:bg-richblack-100 px-4 rounded-lg py-2">
                                <p>{sublink.name}</p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={links?.path}>
                      <p
                        className={`${
                          matchRoute(links?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {links.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login - SignUp - Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative text-richblack-5 py-1 px-2  hover:translate-y-1 transition-all duration-500"
            >
              <img src={PiShoppingCartSimpleLight} alt="Shooping Cart Icon"  className="h-6 w-6"/>
              {totalItems > 0 && (
                <span className="absolute text-md font-semibold -top-1 right-1 rounded-full bg-white px-[2px] py-0 text-red-500">
                  {totalItems}
                </span>
              )}  
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button
                className="border-2 bg-richblack-800 px-3 py-1 rounded-lg text-richblack-5 hover:scale-105 transition-all duration-500 border-richblack-700
                 hover:bg-richblack-5 hover:text-richblack-700 hover:translate-y-1 "
              >
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button
                className="border-2 bg-richblack-800 px-3 py-1 rounded-lg text-richblack-5 hover:scale-105 transition-all duration-500 border-richblack-700
                 hover:bg-richblack-5 hover:text-richblack-700 hover:translate-y-1"
              >
                Sign Up
              </button>
            </Link>
          )}
          {user && user.accountType !== "Instructor" && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
