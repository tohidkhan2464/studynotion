import frameImage from "../assets/frame.png";
import loginImg from "../assets/login.png";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CTAButton from "../components/core/HomePage/Button";

const LoginDetails = {
  title: "Welcome Back",
  desc1: "Build skills for today, tomorrow, and beyond. ",
  desc2: "Education to future-proof your career.",
};

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changehandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged In");
    console.log("Printing the formData ");
    console.log(formData);
    navigate("/dashboard");
  }

  return (
    <div className=" flex w-11/12 max-w-maxContent h-screen py-18 mx-auto gap-x-16 items-center justify-between gap-y-0 ">
      <div className=" w-11/12 max-w-[500px] px-5">
        <h1 className="text-richblack-5 font-semibold text-[1.75rem] leading-[2.75rem]">
          {LoginDetails.title}
        </h1>
        <p className="text-lg  font-medium mt-4 text-richblack-100">
          {LoginDetails.desc1}
          <span className=" text-blue-50 italic font-edu-sa">
            {LoginDetails.desc2}
          </span>
        </p>

        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full gap-y-4 mt-4"
        >
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email Address <sup className=" text-pink-200">*</sup>
            </p>
            <input
              type="email"
              required
              value={formData.email}
              onChange={changehandler}
              placeholder="Enter Email ID"
              name="email"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
            />
          </label>

          <label className="w-full relative mb-4">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Password <sup className=" text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={changehandler}
              placeholder="Enter Password"
              name="password"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] "
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className=" absolute right-3 top-[38px] cursor-pointer "
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2bf" />
              )}
            </span>

            <Link to="#">
              <p className=" text-xs text-blue-50 mt-1 ml-auto mr-0 w-full max-w-max">
                Forgot Password ?
              </p>
            </Link>
          </label>

          <CTAButton active={true} linkto={"/login"}>
            Sign In
          </CTAButton>
        </form>
      </div>
      <div className="relative w-11/12 max-w-[450px]">
        <img
          src={frameImage}
          alt="Frame"
          width={558}
          height={504}
          loading="lazy"
          className=""
        />
        <img
          src={loginImg}
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

export default LoginForm;
