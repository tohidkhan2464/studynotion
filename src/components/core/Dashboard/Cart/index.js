import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white w-11/12 max-w-maxContent flex flex-col  mx-auto my-5">
      <h1 className="text-4xl mobile:text-2xl font-medium">Your Cart</h1>
      <p className="text-base font-medium text-richblack-300 mt-10 border-b-[1px] py-3 border-richblack-500">
        {totalItems} Courses in Cart 
      </p>

      {totalItems > 0 ? (
        <div className="flex flex-row gap-x-4">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="text-center mt-[18%] text-4xl mobile:2xl font-semibold">
          Your Cart is Empty
        </p>
      )}
    </div>
  );
}
