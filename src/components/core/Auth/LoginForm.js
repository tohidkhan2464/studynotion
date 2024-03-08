import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { login } from "../../../services/operations/authAPI"


const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData

  function changehandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email, password, navigate))
  }

  return (
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
          className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] "
        />
      </label>

      <label className="w-full relative">
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

        <Link to="/forgot-password">
          <p className=" text-xs text-blue-25 mt-1 ml-auto mr-0 w-full max-w-max">
            Forgot Password ?
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
