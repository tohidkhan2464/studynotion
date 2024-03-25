import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import countryCodes from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { updateProfile} from '../../../services/operations/profileAPI'

const PersonalInformation = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  console.log("Token in profile info", token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email,
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const { firstName, lastName, email, dateOfBirth, contactNumber, gender } =
    formData;

  function personalInfoHandler(event) {
    event.preventDefault();

   

    console.log("DATA ", formData);
    dispatch(updateProfile(formData, navigate));
    // dispatch(sendOtp(formData.email, navigate));
  }
  return (
    <form onSubmit={personalInfoHandler} className="w-9/12">
      <div className="flex flex-col justify-between  mt-16  bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row gap-y-6 w-full items-start justify-between">
          <p className="text-xl font-semibold">Personal Information</p>
        </div>

        {/* First Name - Last Name  */}
        <div className="flex gap-x-10 mt-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name
            </p>
            <input
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={formData.firstName}
              className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
            />
          </label>

          {/* Last Name */}
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name
            </p>
            <input
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={formData.lastName}
              className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
            />
          </label>
        </div>

        <div className="flex gap-x-10 mt-10">
          {/* Gender */}
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Gender
            </p>
            <div className="flex flex-row gap-4">
              <div className=" w-full flex  justify-center">
                <select name="gender" value={formData.gender} onChange={changeHandler} className="bg-richblack-700 rounded-[0.5rem] w-full text-richblack-5 p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]">
                  <option  value='male' className=" py-3 w-full ">Male</option>
                  <option  value='female' className=" py-3 w-full ">Female</option>
                  <option  value='othe' className=" py-3 w-full ">Other</option>
                </select>
              </div>
            </div>
          </label>

          {/* Email */}
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email Address
            </p>

            <input
              disabled
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address"
              value={user?.email}
              className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] cursor-not-allowed "
            />
          </label>
        </div>

        <div className="flex gap-x-10 mt-10">
          {/* Phone Number */}
          <label className="w-full ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Phone Number
            </p>
            <div className="flex flex-row gap-4">
              <div className=" w-max flex  justify-center">
                <select
                  className="bg-richblack-700 rounded-[0.5rem] w-max text-richblack-5 p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]
                      "
                >
                  {countryCodes.map((element, index) => {
                    return (
                      <option className="h-8 w-max " key={index}>
                        {element.dial_code}
                      </option>
                    );
                  })}
                </select>
              </div>
              <input
                type="number"
                name="contactNumber"
                onChange={changeHandler}
                placeholder="Enter your Phone Number"
                value={formData.contactNumber}
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
              />
            </div>
          </label>

          {/* Date of Birth */}
          <label className="w-full text-richblack-5">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Date of Birth
            </p>

            <input
              type="date"
              name="dateOfBirth"
              onChange={changeHandler}
              placeholder="Enter Date of Birth"
              value={formData.dateOfBirth}
              className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] "
            />
          </label>
        </div>
      </div>
      <div className="flex flex-row gap-x-4 justify-end items-center">
        <button
          type="submit"
          className="mt-2 w-fit rounded-[8px] bg-yellow-50 py-[10px] px-[24px] text-richblack-900 transition-all duration-200 hover:-translate-y-1"
        >
          Update
        </button>
        {/* <button
          onClick={navigate("/dashboard/my-profile")}
          className="mt-2 w-fit rounded-[8px] bg-richblack-700 py-[10px] px-[24px] cursor-pointer  text-richblack-5 drop-shadow-[2px_2px_0px_#424854] transition-all duration-200 hover:-translate-y-1"
        >
          Cancel
        </button> */}
      </div>
    </form>
  );
};

export default PersonalInformation;
