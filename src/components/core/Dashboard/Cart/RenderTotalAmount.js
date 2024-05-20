/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../../../../services/operations/studentFeaturesApi";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    if (token) {
      buyCourse(token, courses, user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="w-[30%] mobile:w-full pt-6">
      <div className="flex flex-col w-full px-10 py-14 bg-richblack-800 rounded-2xl border-[1px] border-richblack-700">
        <p className="text-2xl font-medium text-richblack-300">Total:</p>
        <p className=" font-semibold my-5 text-4xl text-yellow-50">₹ {total}</p>
        <IconBtn
          text={"Buy Now"}
          bgColor={true}
          textColor={true}
          onclick={handleBuyCourse}
          customclasess={"w-full justify-center text-2xl"}
        />
      </div>
    </div>
  );
};

export default RenderTotalAmount;
