import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../../services/operations/settingsAPI";
import { useForm } from "react-hook-form";
import IconBtn from "../../../common/IconBtn";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      dispatch(updatePassword(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="w-9/12">
        <div className="flex flex-col justify-between  mt-16  bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
          <div className="flex flex-row gap-y-6 w-full items-start justify-between">
            <p className="text-xl font-semibold">Update Password</p>
          </div>

          {/* Current Password - New Password */}
          <div className="flex gap-x-10 mt-4 mobile:flex-col mobile:gap-y-4">
            {/* Current Password */}
            <div className="flex flex-col mobile:w-full gap-2 w-[48%]">
              <label htmlFor="currentPassword" className="lable-style">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Current Password"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("currentPassword", { required: true })}
              />
              {errors.currentPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your current password.
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col mobile:w-full gap-2 w-[48%]">
              <label htmlFor="newPassword" className="lable-style">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]  "
                {...register("newPassword", { required: true })}
              />
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your new password.
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

export default UpdatePassword;
