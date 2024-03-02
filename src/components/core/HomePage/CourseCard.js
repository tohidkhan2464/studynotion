import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {

  const { heading, description, lessionNumber, level } = cardData;
  
  return (
    <div
      onClick={() => setCurrentCard(heading)}
      className={`group flex flex-col justify-between items-start  pt-10 transition-all duration-200 cursor-pointer 
      ${
        currentCard === heading
          ? "bg-white shadow-[10px_10px_#FFD60A]"
          : "bg-richblack-800 "
      }`}
    >
      <div className="px-8">
        <div
          className={`text-2xl font-semibold
         ${
           currentCard === heading ? "text-richblack-900" : "text-richblack-25 "
         } `}
        >
          {heading}
        </div>
        <p className=" text-richblack-300 mt-5 text-xl mb-5">{description}</p>
      </div>
      <div className="w-full border-dashed border-t-2 border-richblack-200 mt-10">
        {" "}
      </div>
      <div
        className={`flex flex-row mt-6 items-center justify-between  mx-auto w-full my-5 px-8
       ${currentCard === heading ? "text-richblue-300" : "text-richblack-300"}`}
      >
        <div className="flex flex-row items-center gap-2">
          <HiUsers />
          <p>{level}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ImTree />
          <p>{lessionNumber} Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
