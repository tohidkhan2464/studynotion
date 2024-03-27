import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import countryCodes from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
// import { MdDoNotDisturbOn } from "react-icons/md";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  // const [validation, setValidation] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(event) {

    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));

    // if(event.target.value.length === 0 ){
    //   setValidation(false)
    // }else{
    //   setValidation(true)
    // }
  }
  const { firstName, lastName, email, password, contactNumber, confirmPassword } = formData;

  // const uppercaseRegExp = /(?=.*?[A-Z])/;
  // const lowercaseRegExp = /(?=.*?[a-z])/;
  // const digitsRegExp = /(?=.*?[0-9])/;
  // const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  // const minLengthRegExp = /.{6,}/;

  function submitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      // setFormData({
      //   password: "",
      //   confirmPassword: "",
      // });
      return;
    }

    // const uppercasePassword = uppercaseRegExp.test(password);
    // const lowercasePassword = lowercaseRegExp.test(password);
    // const digitsPassword = digitsRegExp.test(password);
    // const specialCharPassword = specialCharRegExp.test(password);
    // const minLengthPassword = minLengthRegExp.test(password);
    // setIsLoggedIn(true);
    // toast.success("Account Created.");
    // const accountData = {
    //   ...formData,
    // };

    const data = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    // To be used after otp verification
    console.log("DATA ", data)
    dispatch(setSignupData(data));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   contactNumber:"",
    // });
    // setAccountType("student");
  }

  

  return (
    <div className="text-richblack-5">
      {/* Student - Instructor Tab */}
      <div className="flex  bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
        <button
          className={`${
            accountType === "Student"
              ? " bg-richblack-900 text-richblack-5"
              : " bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-500`}
          onClick={() => {
            setAccountType(ACCOUNT_TYPE.STUDENT);
          }}
        >
          Student
        </button>

        <button
          className={`${
            accountType === "Instructor"
              ? " bg-richblack-900 text-richblack-5"
              : " bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-500`}
          onClick={() => {
            setAccountType(ACCOUNT_TYPE.INSTRUCTOR);
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
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstName}
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
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastName}
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
              <div className=" w-max flex  justify-center">
                <select
                  className="bg-richblack-800 rounded-[0.5rem] w-max text-richblack-5 p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]
                      "
                >
                  {countryCodes.map((element, index) => {
                    return (
                      <option className="h-8 w-max " key={index}>{element.dial_code}</option>
                    );
                  })}
                </select>
              </div>
              <input
                required
                type="number"
                name="contactNumber"
                onChange={changeHandler}
                placeholder="Enter your Phone Number"
                value={formData.contactNumber}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
              />
            </div>
          </label>
        </div>

        {/* Create Password - Confirm Password */}
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
        <button
        type="submit"
        className="mt-2 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 transition-all duration-200 hover:-translate-y-1"
      >
        Sign Up
      </button>
      </form>
    </div>
  );
};

export default SignupForm;
