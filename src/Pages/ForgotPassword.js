import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { GoArrowLeft } from "react-icons/go";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className="w-maxContent w-11/12 h-[calc(100vh-3.5rem)] mobile:h-full mobile:items-start mobile:my-[10.5rem] text-white flex justify-center items-center gap-4 ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col justify-center max-w-[500px] px-8 gap-y-4">
          <h1 className="text-3xl font-bold">{!emailSent ? "Reset Your Password" : "Check your Email"}</h1>

          <p className=" text-richblack-300 mt-2">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full relative">
                <p className="my-2">Email Address</p>
                <input
                  required
                  type="email"
                  name="email"
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
              </label>
            )}

            <button type="submit" className="mt-6 rounded-[8px] bg-yellow-100 py-[8px] px-[12px] font-semibold text-richblack-900 w-full hover:bg-yellow-25 transition-all duration-200 "
            >{!emailSent ? "Reset Password" : "Resend Email"}</button>
          </form>

          <div>
            <Link to='/login'>
                <p className=" text-lg mt-1 w-full text-richblack-300 max-w-max flex flex-row items-center gap-2 hover:text-richblack-5 transition-all duration-200"><GoArrowLeft/> Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
