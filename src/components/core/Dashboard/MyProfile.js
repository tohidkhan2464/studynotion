import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FaEdit from "../../../assets/dashboard/fi-rr-edit.svg";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="text-white w-11/12 desktop:ml-[15rem] desktop:w-9/12 max-w-maxContent flex flex-col items-center mx-auto my-12">
      <h1 className="text-4xl mobile:text-2xl font-semibold">My Profile</h1>

      {/* Section 1 */}
      <div className="flex flex-row mobile:flex-col mobile:mx-auto justify-between items-center mt-16 w-9/12 bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row mobile:flex-col gap-x-6 items-center">
          <img
            src={user?.image}
            alt={`Profile-${user?.firstName}`}
            className=" aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="flex flex-col mobile:items-center mobile:mt-5 items-start justify-center gap-y-4">
            <p className="text-xl font-semibold">
              {" "}
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className=" text-base text-richblack-300"> {user?.email} </p>
          </div>
        </div>
        <IconBtn
          onclick={() => {
            navigate("/dashboard/settings");
          }}
          bgColor={true}
          children={true}
          textColor={true}
          text={"Edit"}
          customclasess={"flex flex-row-reverse mobile:mt-5 gap-2"}
        >
          {" "}
          <img src={FaEdit} alt="edit icon" />
        </IconBtn>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col mobile:items-center justify-between items-start mt-16 w-9/12 bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row mobile:flex-col mobile:items-center gap-y-6 w-full items-start justify-between">
          <p className="text-xl font-semibold">Personal Details</p>

          <IconBtn
            onclick={() => {
              navigate("/dashboard/settings");
            }}
            bgColor={true}
            children={true}
            textColor={true}
            text={"Edit"}
            customclasess={"flex flex-row-reverse mobile:mt-0 gap-2"}
          >
            {" "}
            <img src={FaEdit} alt="edit icon" />
          </IconBtn>
        </div>
        <p className="text-base mobile:mt-5 text-richblack-300">
          {user?.additionalDetails?.about ?? "Write Something about Yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="flex flex-col justify-between   mt-16 w-9/12 bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row mobile:items-center mobile:flex-col gap-y-6 w-full items-start justify-between">
          <p className="text-xl font-semibold">Personal Details</p>
          <IconBtn
            onclick={() => {
              navigate("/dashboard/settings");
            }}
            bgColor={true}
            children={true}
            textColor={true}
            customclasess={"flex flex-row-reverse gap-2"}
            text={"Edit"}
          >
            {" "}
            <img src={FaEdit} alt="edit icon" />
          </IconBtn>
        </div>
        <div className="grid grid-cols-2 mobile:grid-cols-1  gap-4 place-items-start content-between w-full mt-5">
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-richblack-300">First Name</p>
            <p className="text-sm font-medium">{user?.firstName}</p>
          </div>
          {user?.lastName && (
            <div className="flex flex-col gap-y-1">
              <p className="text-sm text-richblack-300">Last Name</p>
              <p className="text-sm font-medium">{user?.lastName ?? ""}</p>
            </div>
          )}
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-richblack-300">Email</p>
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-richblack-300">Gender</p>
            <p className="text-sm font-medium">
              {user?.additionalDetails?.gender ?? "Add your Gender"}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-richblack-300">Contact Number</p>
            <p className="text-sm font-medium">
              {user?.additionalDetails?.contactNumber ??
                "Add your Contact Number"}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-richblack-300">Date of Birth</p>
            <p className="text-sm font-medium">
              {user?.additionalDetails?.dateOfBirth ?? "Add your Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
