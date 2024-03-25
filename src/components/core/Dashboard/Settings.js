import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiFillCheckCircle,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import countryCodes from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";

import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import PersonalInformation from "./PersonalInformation";

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
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
  const {
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    confirmPassword,
  } = formData;

  function personalInfoHandler(event) {
    event.preventDefault();

    const data = {
      ...formData,
      accountType,
    };

    console.log("DATA ", data);
    // dispatch(setSignupData(data));
    // dispatch(sendOtp(formData.email, navigate));
  }

  return (
    <div className="text-white w-11/12 max-w-maxContent flex flex-col items-center mx-auto my-12">
      <h1 className="text-4xl font-semibold">Edit Profile</h1>

      {/* Section 1 */}
      {/* <div className="flex flex-row justify-between items-center mt-16 w-9/12 bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row gap-x-6 items-center">
          <img
            src={user?.image}
            alt={`Profile-${user?.firstName}`}
            className=" aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="flex flex-col items-start justify-center gap-y-4">
            <p className="text-xl font-semibold">Change Profile Picture</p>
            <form>
              <div className="flex flex-row gap-x-4 w-full">
                <label className="relative  text-lg  w-24 h-10 text-richblack-900">
                  
                 
                  <input type="file"
                    className=" px-5 py-2 bg-[#FFD60A] absolute top-0 left-0 text-lg  w-24 h-10 text-richblack-900 rounded-lg flex flex-row gap-x-2 items-center cursor-pointer"
                    onClick={() => {
                      navigate("/dashboard/settings");
                    }}
                  /> Upload
                </label>

                <button
                  type="submit"
                  className=" px-5 py-2 bg-richblack-700 border-[1px] border-richblack-600 text-lg  w-24 h-10 text-richblack-5 rounded-lg flex flex-row gap-x-2 items-center cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard/settings");
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      {/* Section 2 */}
      {/* <div className="flex flex-col justify-between items-start mt-16 w-9/12 bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row gap-y-6 w-full items-start justify-between">
          <p className="text-xl font-semibold">Personal Details</p>
          <button
            className=" px-5 py-2 bg-[#FFD60A] text-lg  w-24 h-10 text-richblack-900 rounded-lg flex flex-row gap-x-2 items-center cursor-pointer"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            {" "}
            <img src={FaEdit} alt="edit icon" />
            Edit
          </button>
        </div>
        <p className="text-base text-richblack-300">
          {user?.additionalDetails?.about ?? "Write Something about Yourself"}
        </p>
      </div> */}

      {/* Section 3 Personal Information */}
      <PersonalInformation/>
      
    </div>
  );
};

export default Settings;
