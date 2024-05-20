/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Home_items/Logo.svg";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import PiShoppingCartSimpleLight from "../../assets/Home_items/fi-rr-shopping-cart.svg";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/api";
import { apiConnector } from "../../services/apiConnector";
import { IoIosArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector({
          method: "GET",
          url: categories.CATEGORIES_API,
        });
        setSubLinks(res?.data?.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center bg-richblack-800 border-b-2 border-b-richblack-700">
      <div className="relative flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo Image */}
        <div className="hidden mobile:block largeMobile:block text-richblack-5 transition-all duration-200">
          {!isVisible ? (
            <RxHamburgerMenu onClick={() => setIsVisible(!isVisible)} />
          ) : (
            <RxCross1 onClick={() => setIsVisible(!isVisible)} />
          )}
        </div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[160px] mobile:absolute mobile:top-1 mobile:left-6 h-[32px] 
            largeMobile:w-[120px] largeMobile:h-[28px] largeMobile:absolute largeMobile:top-1 largeMobile:left-6  mobile:w-[120px] mobile:h-[28px]"
            loading="lazy"
          />
        </Link>

        {/* Nav links */}
        <nav
          className={`${
            isVisible
              ? "block absolute top-[45px] rounded-xl bg-richblack-700 z-20 py-2 px-4 -left-5"
              : "mobile:hidden desktop:block largeMobile:hidden"
          }`}
        >
          <ul className="flex mobile:flex-col largeMobile:flex-col  text-richblack-25">
            {NavbarLinks.map((links, index) => {
              return (
                <li key={index}>
                  {links.title === "Catalog" ? (
                    <div className="flex gap-1 mobile:hidden largeMobile:hidden mx-3  items-center relative group">
                      <p>{links.title}</p>
                      <IoIosArrowDropdown />

                      <div
                        className=" invisible absolute left-[50%] top-0 flex flex-col rounded-md bg-richblack-5 p-2
                      text-richblack-900 opacity-0 transition-all duration-500 z-10
                       group-hover:visible group-hover:opacity-100 lg:w-[300px] translate-x-[-50%] translate-y-[30%]"
                      >
                        <div className=" absolute left-[50%] translate-x-[60%] -top-2 h-6 w-6 rotate-45 rounded bg-richblack-5 -z-10"></div>
                        {loading ? (
                          <p className="text-center"> Loading... </p>
                        ) : subLinks?.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses.length !== 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-1 px-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center py-1 px-4">
                            No Courses Found
                          </p>
                        )}
                      </div>
                    </div>
                  ) : token !== null && links.title === "All Courses" ? (
                    <Link to={links?.path}>
                      <p
                        onClick={() => setIsVisible(false)}
                        className={`hidden h-0 w-0 ${
                          matchRoute(links?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        } mobile:my-2 largeMobile:my-3 mx-3`}
                      >
                        {links.title}
                      </p>
                    </Link>
                  ) : (
                    <Link to={links?.path}>
                      <p
                        onClick={() => setIsVisible(false)}
                        className={`${
                          matchRoute(links?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        } mobile:my-2 largeMobile:my-3 mx-3`}
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
        <div className="flex gap-x-4 mobile:gap-x-2 largeMobile:gap-x-3 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative text-richblack-5 py-1 px-2  hover:translate-y-1 transition-all duration-500"
            >
              <img
                src={PiShoppingCartSimpleLight}
                alt="Shooping Cart Icon"
                className="h-6 w-6"
              />
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
          {user && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
