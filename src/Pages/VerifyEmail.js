/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { MdHistory } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signupData } = useSelector((state) => state.auth);
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    contactNumber,
    accountType,
  } = signupData;
  console.log("SignUP Data ", signupData);
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        accountType,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="w-maxContent w-11/12 h-[calc(100vh-3.5rem)]  mobile:items-start mobile:pt-[15rem]  flex justify-center items-center gap-2 ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col justify-center max-w-[500px] px-8 gap-y-2">
          <h1 className="text-3xl text-white font-bold">Verify Email</h1>
          <p className=" text-richblack-300 mt-2">
            A verification code has been sent to you, Enter the code below
          </p>

          <form onSubmit={submitHandler}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>&nbsp;-&nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] desktop:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5  aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
            />
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-100 py-[8px] px-[12px] font-semibold text-richblack-900 
              w-full hover:bg-yellow-25 transition-all duration-200 "
            >
              Verify Email
            </button>
          </form>

          <div className="flex flex-row items-center justify-between mt-2">
            <div>
              <Link to="/login">
                <p className=" text-[16px] mt-1 w-full text-richblack-300 max-w-max flex flex-row items-center gap-1 hover:text-richblack-5 transition-all duration-200">
                  <GoArrowLeft className="h-6 w-6" /> Back to Login
                </p>
              </Link>
            </div>
            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className=" text-blue-50 text-[16px] flex flex-row gap-1 items-center hover:text-blue-25"
            >
              <MdHistory className="h-7 w-7" />
              Resent it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
