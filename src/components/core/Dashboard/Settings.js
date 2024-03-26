import { useSelector } from "react-redux";
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
import UpdatePassword from "./UpdatePassword";
import ChangeProfilePicture from "./ChangeDisplayPicture";
import DeleteProfile from "./DeleteProfile";
// import ChangeDisplayPicture from "./ChangeDisplayPicture";

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
  }

  return (
    <div className="text-white w-11/12 max-w-maxContent flex flex-col items-center mx-auto my-12">
      <h1 className="text-4xl mobile:text-2xl font-semibold">Edit Profile</h1>

      {/* Section 1 Display Picture*/}
      <ChangeProfilePicture />

      {/* Section 2 Personal Information */}
      <PersonalInformation />

      {/* Section 3 Update Password */}
      <UpdatePassword />

      {/* Section 4 Delete profile */}
      <DeleteProfile />
    </div>
  );
};

export default Settings;
