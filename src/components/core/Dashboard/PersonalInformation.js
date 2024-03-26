import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../services/operations/settingsAPI";
import { useForm } from "react-hook-form";
import IconBtn from "../../common/IconBtn";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const PersonalInformation = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("Form data", data);
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="w-9/12">
        <div className="flex flex-col justify-between  mt-16  bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
          <div className="flex flex-row gap-y-6 w-full items-start justify-between">
            <p className="text-xl font-semibold">Personal Information</p>
          </div>

          {/* First Name - Last Name */}
          <div className="flex gap-x-10 mobile:flex-col mobile:gap-y-4 mt-4">
            {/* First Name */}
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          {/* Gender - About */}
          <div className="flex gap-x-10 mt-10 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
            {/* Gender */}
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] cursor-pointer "
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>

            {/* About */}
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>

          {/* Phone Number - Date of Birth */}
          <div className="flex gap-x-10 mt-10 mobile:mt-4 mobile:flex-col mobile:gap-y-4">
            {/* Phone Number */}
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("contactNumber")}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("dateOfBirth")}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] bg-richblack-700 text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-x-4 mobile:mt-5 justify-end items-center">
          <IconBtn
            onclick={navigate("/dashboard/my-profile")}
            bgColor={false}
            textColor={false}
            text={"Cancel"}
          ></IconBtn>
          <IconBtn
            text={"Update"}
            type={"submit"}
            bgColor={true}
            textColor={true}
          ></IconBtn>
        </div>
      </form>
    </>
  );
};

export default PersonalInformation;
