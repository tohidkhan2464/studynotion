import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactStars from "react-stars";
import trash from "../../../../assets/dashboard/fi-br-trash.svg";
import IconBtn from "../../../common/IconBtn";
import { removeFromCart } from "../../../../slices/cartSlice";
import GetAvgRating from "../../../../utils/avgRating";

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="w-[70%] mobile:w-full">
      {cart.map((course, index) => {
        return (
          <div
            className={`flex flex-row mobile:pr-0 gap-x-4 py-6 pr-10 w-full justify-between ${
              index === -1
                ? "border-none"
                : "border-richblack-500 border-b-[1px]"
            } `}
          >
            <div className="flex flex-row mobile:flex-col gap-x-4 w-full">
              <img
                src={course?.thumbnail}
                alt="Course Thumbnail"
                className=" rounded-xl h-[180px] mobile:h-[120px] w-[240px] object-contain"
              />
              <div className="w-full flex mobile:mt-2 flex-col">
                <p className="w-full text-lg font-medium">
                  {course?.courseName}
                </p>
                <p className="text-richblack-300 mt-2 mobile:mt-1">
                  {course?.category?.name}
                </p>
                <div className="flex flex-row gap-x-2 mobile:gap-x-1 items-center">
                  <span className="text-lg font-semibold">
                    {GetAvgRating(course?.ratingAndReviews)}
                  </span>
                  <ReactStars
                    count={5}
                    size={30}
                    edit={false}
                    color2="#ffd700"
                    half={true}
                    value={GetAvgRating(course?.ratingAndReviews)}
                  />

                  <span className="text-lg text-richblack-300">
                    {course?.ratingAndReviews?.length} Reviews
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-[160px]">
              <IconBtn
                text={"Remove"}
                onclick={() => dispatch(removeFromCart(course._id))}
                customclasess={
                  "flex flex-row-reverse gap-2 w-full items-center justify-center rounded-md bg-richblack-800 py-2 px-5 font-semibold text-red-400"
                }
              >
                <img src={trash} alt="delete button" />
              </IconBtn>

              <p className=" text-yellow-50 text-4xl mobile:text-2xl mt-4">
                ₹ {course?.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderCartCourses;
