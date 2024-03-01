import React from "react";
import level from "../../../assets/Home_items/users.svg";
import lesson from "../../../assets/Home_items/fi-sr-chart-tree.svg";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  // console.log("cardData, ", cardData)

  return (
    <div
      className={`group flex flex-col justify-between items-start hover:bg-white bg-richblack-800 pt-10 transition-all duration-200 hover:shadow-[10px_10px_#FFD60A] `}
    >
        <div className="px-8">

      <div className="text-2xl text-richblack-25 group-hover:text-richblack-900 font-semibold">
        {cardData.heading}
      </div>
      <p className=" text-richblack-300 mt-5 text-xl mb-5">
        {cardData.description}
      </p>
        </div>
      <div className="w-full border-dashed border-t-2 border-richblack-200"> </div>
      <div className="flex flex-row mt-6 items-center justify-between text-richblack-300 group-hover:text-richblue-300 mx-auto w-full my-5 px-8">
        <div className="flex flex-row items-center gap-2">
          <img src={level} alt="level" />
          <p>{cardData.level}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src={level} alt="lesson" />
          <p>{cardData.lessionNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
