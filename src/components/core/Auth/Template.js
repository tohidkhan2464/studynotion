import React from "react";
import frameImage from "../../../assets/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, desc1, desc2, image, formType, setIsLoggedIn }) => {
  return (
    <div className="flex w-11/12 max-w-[1160px] mobile:flex-col py-12 mx-auto gap-x-12  pb-32 mobile:pb-20 justify-between gap-y-0 ">
      <div className=" w-11/12 max-w-[450px] mobile:w-full mobile:max-w-[350px] mobile:mx-auto ">
        <h1 className="text-richblack-5 font-semibold text-[1.75rem] leading-[2.75rem]">
          {title}
        </h1>
        <p className="text-[1.25rem] leading-[1.625rem] mt-4">
          <span className=" text-richblack-100">{desc1}</span>
          <br />
          <span className=" text-blue-25 italic">{desc2}</span>
        </p>

        {formType === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
      <div className="relative w-11/12 max-w-[450px] mobile:w-full mobile:max-w-[350px] mobile:mx-auto mobile:mt-20 ">
        <img
          src={frameImage}
          alt="Frame"
          width={558}
          height={504}
          loading="lazy"
          className=""
        />
        <img
          src={image}
          alt="students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4"
        />
      </div>
    </div>
  );
};

export default Template;
