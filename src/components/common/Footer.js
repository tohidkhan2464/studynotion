import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import logo from "../../assets/Home_items/Logo.svg";
import { useNavigate } from "react-router-dom";
import {
  PiFacebookLogoFill,
  PiTwitterLogoFill,
  PiGoogleLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { GoHeartFill } from "react-icons/go";

import {
  HiHome,
  HiInformationCircle,
  HiAcademicCap,
  HiMail,
} from "react-icons/hi";
export const NavbarLinks = [
  {
    title: "Home",
    path: "/",
    icon: <HiHome fontSize={20} />,
  },
  {
    title: "All Courses",
    path: "/all-courses",
    icon: <HiAcademicCap fontSize={20} />,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <HiInformationCircle fontSize={20} />,
  },
  {
    title: "Contact Us",
    path: "/contact",
    icon: <HiMail fontSize={20} />,
  },
];

const BottomFooter = ["Privacy Policy", "Terms", "Cookie Policy"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-maxContent mobile:w-full largeMobile:w-full  border-t-2 border-richblack-700 py-12 flex flex-col gap-8 bg-richblack-800 items-center mx-auto text-richblack-300">
        <div className=" flex flex-row mobile:grid largeMobile:grid largeMobile:grid-cols-2 largeMobile:gap-0 mobile:grid-cols-2 gap-6 mobile:gap-0">
          <div className="flex flex-row mobile:flex-col largeMobile:flex-col largeMobile:border-none gap-3 mobile:border-none border-r-2 border-richblack-700">
            <div className="flex flex-col gap-3 mr-10 mobile:mr-0 largeMobile:mr-0">
              <div>
                <img src={logo} alt="logo studynotion" className="h-[32px]" />
              </div>

              <p className="text-[16px] text-richblack-50 font-semibold mt-2">
                Company
              </p>

              <div className="flex flex-col gap-1 mt-2">
                {NavbarLinks.map((links, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`${links?.path}`)}
                      className="text-[14px] mt-1 flex flex-row items-center gap-x-2 hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500 hover:underline"
                    >
                      {links.icon}
                      {links.title}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-row gap-3 text-2xl mt-3 ">
                <PiFacebookLogoFill className="hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500" />
                <PiTwitterLogoFill className="hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500" />
                <PiGoogleLogoFill className="hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500" />
                <PiYoutubeLogoFill className="hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500" />
              </div>
            </div>

            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-3 mobile:mr-0 largeMobile:mr-0 mr-20">
                <p className="text-[16px] text-richblack-50 font-semibold mt-2">
                  Resources
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  {Resources.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] mt-1 hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500 hover:underline"
                      >
                        {ele}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[16px] text-richblack-50 font-semibold mt-2">
                  Support
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="text-[14px] hover:text-richblack-50 cursor-pointer mt-1 hover:-translate-y-1 transition-all duration-500 hover:underline">
                    Help Center
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-3 mobile:mr-0 mr-20">
                <p className="text-[16px] text-richblack-50 font-semibold mt-2">
                  Plans
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  {Plans.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] mt-1 hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500 hover:underline"
                      >
                        {ele}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[16px] text-richblack-50 font-semibold mt-2">
                  Community
                </p>
                <div className="flex flex-col gap-1 mt-2">
                  {Community.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] mt-1 hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500 hover:underline"
                      >
                        {ele}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row mobile:flex-col mobile:gap-0 largeMobile:gap-0 gap-3 mobile:ml-5">
            <div className="flex flex-row mobile:flex-col largeMobile:flex-col gap-3">
              {FooterLink2.map((element, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-3 mobile:mr-0 largeMobile:mr-0 mr-20"
                  >
                    <p className="text-[16px] text-richblack-50 font-semibold mt-2">
                      {element.title}
                    </p>
                    <div className="flex flex-col gap-1 mt-2">
                      {element.links.map((link, index) => {
                        return (
                          <div
                            key={index}
                            className="text-[14px] mt-1 hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500 hover:underline"
                          >
                            {link.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-richblack-700  max-w-maxContent pt-10 flex flex-row mobile:flex-col largeMobile:flex-col items-center justify-between mx-auto w-full">
          <div className="flex flex-row  gap-1">
            {BottomFooter.map((ele, index) => {
              return (
                <div
                  key={index}
                  className={`text-[14px] mt-1 hover:text-richblack-50 cursor-pointer hover:-translate-y-1 transition-all duration-500 hover:underline font-medium px-4 ${
                    index === 0
                      ? "border-none"
                      : "border-l-2 border-richblack-700 "
                  } `}
                >
                  {ele}
                </div>
              );
            })}
          </div>

          <div className="flex flex-row mobile:flex-col largeMobile:flex-col largeMobile:mt-2 items-center gap-2 mobile:mt-2 font-semibold">
            <p>Made with</p> <GoHeartFill className=" text-pink-200" />{" "}
            <p>Tohid Khan @2024 StudyNotion </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
