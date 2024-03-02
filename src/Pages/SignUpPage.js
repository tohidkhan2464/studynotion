import frameImage from "../assets/frame.png";
import signUpImg from "../assets/signup.png";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CTAButton from "../components/core/HomePage/Button";
// import { IoChevronDownSharp } from "react-icons/io5";
import countryCodes from "../data/countrycode.json";

const signUpDetails = {
  title: "Join the millions learning to code with StudyNotion for free",
  desc1: "Build skills for today, tomorrow, and beyond.",
  desc2: "Education to future-proof your career.",
};

const SignupForm = ({
  title,
  desc1,
  desc2,
  image,
  formType,
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    countryCode: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match.");
      return;
    }
    setIsLoggedIn(true);
    toast.success("Account Created.");
    const accountData = {
      ...formData,
    };

    const finalData = {
      ...accountData,
      accountType,
    };
    console.log("Printing final account Data.");
    console.log(finalData);
    navigate("/dashboard");
  }

  return (
    <div className=" flex w-11/12 max-w-maxContent h-full  py-12 mx-auto gap-x-12 justify-between gap-y-0 ">
      <div className=" w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.75rem] leading-[2.75rem]">
          {signUpDetails.title}
        </h1>
        <p className="text-lg  font-medium mt-4 text-richblack-100">
          {signUpDetails.desc1}
          <span className=" text-blue-50 italic font-edu-sa">
            {signUpDetails.desc2}
          </span>
        </p>

        <div>
          {/* Student - Instructor Tab */}
          <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
            <button
              className={`${
                accountType === "student"
                  ? " bg-richblack-900 text-richblack-5"
                  : " bg-transparent text-richblack-200"
              } py-2 px-5 rounded-full transition-all duration-200`}
              onClick={() => {
                setAccountType("student");
              }}
            >
              Student
            </button>

            <button
              className={`${
                accountType === "instructor"
                  ? " bg-richblack-900 text-richblack-5"
                  : " bg-transparent text-richblack-200"
              } py-2 px-5 rounded-full transition-all duration-200`}
              onClick={() => {
                setAccountType("instructor");
              }}
            >
              Instructor
            </button>
          </div>

          <form onSubmit={submitHandler}>
            {/* First Name - Last Name  */}
            <div className="flex gap-x-4 mt-4">
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  First Name
                  <sup className=" text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="firstname"
                  onChange={changeHandler}
                  placeholder="Enter First Name"
                  value={formData.firstname}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
                />
              </label>

              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Last Name
                  <sup className=" text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="text"
                  name="lastname"
                  onChange={changeHandler}
                  placeholder="Enter Last Name"
                  value={formData.lastname}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
                />
              </label>
            </div>

            {/* Email Address */}
            <div className="mt-4">
              <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Email Address
                  <sup className=" text-pink-200">*</sup>
                </p>

                <input
                  required
                  type="email"
                  name="email"
                  onChange={changeHandler}
                  placeholder="Enter Email Address"
                  value={formData.email}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] "
                />
              </label>
            </div>

            {/* Phone Number  */}
            <div className="flex gap-x-4 mt-4">
              <label className="w-full ">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Phone Number
                  <sup className=" text-pink-200">*</sup>
                </p>
                <div className="flex flex-row gap-4">
                  <div className="w-[25%] flex flex-row gap-2 relative">
                    <select className="bg-richblack-800 rounded-[0.5rem] w-full  text-richblack-5 p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]">
                      {countryCodes.map((element, index) => {
                        return (
                          <option className="h-8 w-8">
                            {element.dial_code}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    required
                    type="number"
                    name="phoneNumber"
                    onChange={changeHandler}
                    placeholder="Enter your Phone Number"
                    value={formData.phoneNumber}
                    className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
                  />
                </div>
              </label>
            </div>

            {/* Create Password - COnfirm Password */}
            <div className="flex gap-x-4 mt-4 mb-8">
              <label className=" relative w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Create Password
                  <sup className=" text-pink-200">*</sup>
                </p>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={changeHandler}
                  placeholder="Enter Password"
                  value={formData.password}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
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
              </label>

              <label className=" relative w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Confirm Password
                  <sup className=" text-pink-200">*</sup>
                </p>

                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={changeHandler}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
                />

                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className=" absolute right-3 top-[38px] cursor-pointer "
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#afb2bf" />
                  )}
                </span>
              </label>
            </div>
            <CTAButton active={true} linkto={"/signup"}>
              Create Account
            </CTAButton>
          </form>
        </div>
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
          src={signUpImg}
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

export default SignupForm;
