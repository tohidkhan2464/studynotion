import React, { useEffect, useState } from "react";
import { IoVideocam } from "react-icons/io5";
import { BsChevronUp } from "react-icons/bs";
import { convertSecondsToDuration } from "../../../services/convertSecondsToDuration";

const CourseSubSection = ({ subSection, handleActive, isActive }) => {
  const [totalDuration, setTotalDuration] = useState("");

  useEffect(() => {
    const totalLectureTime = () => {
      let totalDurationInSeconds = 0;
      const timeDurationInSeconds = parseInt(subSection.timeDuration);
      totalDurationInSeconds += timeDurationInSeconds;
      setTotalDuration(totalDurationInSeconds);
    };
    totalLectureTime();
  }, []);

  return (
    <div className=" text-richblack-5 py-2">
      <div className="flex flex-row items-center justify-between ">
        <div
          className="flex flex-row items-center gap-x-2 text-richblack-50"
          onClick={() => {
            handleActive(subSection._id);
          }}
        >
          <IoVideocam />
          <p className="mobile:max-w-[280px]">{subSection?.title}</p>

          <BsChevronUp
            className={`${
              isActive?.includes(subSection._id) ? " rotate-180" : " rotate-0"
            }`}
          />
        </div>

        <div className="flex items-center text-richblack-50">
          <p>{convertSecondsToDuration(totalDuration)}</p>
        </div>
      </div>
      {isActive?.includes(subSection._id) && (
        <div className="px-6 pr-40 mobile:pr-20 mt-2 text-richblack-300 ">
          <p>{subSection?.description} </p>
        </div>
      )}
    </div>
  );
};

export default CourseSubSection;
