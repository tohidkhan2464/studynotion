import React from "react";
import IconBtn from "../../common/IconBtn";
import trash from "../../../assets/dashboard/fi-br-trash.svg";
import { deleteProfile } from "../../../services/operations/settingsAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const DeleteProfile = () => {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE ", error.message);
    }
  };

  return (
    <div className="w-9/12">
      <div className="flex flex-col justify-between  mt-16 bg-red-990 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row mobile:flex-col mobile:items-center gap-x-6 w-full items-start ">
          <div className=" bg-[#691432] rounded-full p-4">
            <img src={trash} alt="Bin Icon" className="h-8 w-8" />
          </div>
          <div className="flex flex-col items-start space-y-2 mobile:mt-5 mobile:items-center mobile:text-center ">
            <p className="text-xl font-semibold text-red-100">Delete Account</p>
            <div className="flex flex-col mobile:max-w-[90%] max-w-[80%]">
              <p className=" text-red-200">Would you like to delete account?</p>
              <p className="text-red-200">
                This account contains Paid Courses. Deleting your account will
                remove all the contain associated with it.
              </p>
              <p
                className="text-red-400 italic mt-2 cursor-pointer hover:underline"
                onClick={deleteAccount}
              >
                I want to delete my account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
