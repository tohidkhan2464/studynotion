import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const { password, confirmPassword } = formData;

  function submitHandler(event) {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  }

  return (
    <div className="w-maxContent w-11/12 h-screen mobile:items-start mobile:pt-[10rem]   text-white flex justify-center items-center gap-2 ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col justify-center mobile:mx-auto mobile:w-11/12 mobile:text-center max-w-[500px] px-8 gap-y-2">
          <h1 className="text-3xl font-bold">Choose new Password</h1>
          <p className=" text-richblack-300 mt-2">
            Almost done. Enter your new password and you are all set.
          </p>

          <form onSubmit={submitHandler}>
            <div className="relative">
              <label className="  w-full">
                <p className="text-[0.875rem] text-richblack-5 my-2 leading-[1.375rem]">
                  Create new Password
                  <sup className=" text-pink-200">*</sup>
                </p>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={changeHandler}
                  placeholder="Enter new Password"
                  value={formData.password}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
                />

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className=" absolute right-3 top-[50%] cursor-pointer "
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#afb2bf" />
                  )}
                </span>
              </label>
            </div>

            <div className="relative">
              <label className="  w-full">
                <p className="text-[0.875rem] text-richblack-5 my-2 mt-6 leading-[1.375rem]">
                  Confirm new Password
                  <sup className=" text-pink-200">*</sup>
                </p>

                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={changeHandler}
                  placeholder="Confirm new Password"
                  value={formData.confirmPassword}
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
                />

                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className=" absolute right-3 top-[50%] cursor-pointer "
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
              className="mt-6 rounded-[8px] bg-yellow-100 py-[8px] px-[12px] font-semibold text-richblack-900 
              w-full hover:bg-yellow-25 transition-all duration-200 "
            >
              Reset Password
            </button>
          </form>
          <div>
            <Link to="/login">
              <p className=" text-lg mt-1 w-full text-richblack-300 max-w-max flex flex-row items-center gap-2 hover:text-richblack-5 transition-all duration-200">
                <GoArrowLeft /> Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
