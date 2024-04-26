import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these courses : ", courses);
    // TODO: API INTEGRATION FOR PAYMENT
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
