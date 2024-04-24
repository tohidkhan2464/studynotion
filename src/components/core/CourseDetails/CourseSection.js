import React, { useEffect, useState } from "react";
import { CiCircleChevRight } from "react-icons/ci";
import { convertSecondsToDuration } from "../../../services/convertSecondsToDuration";

const CourseSection = ({ section, isActive, handleActive }) => {
  const [totalDuration, setTotalDuration] = useState("");

  useEffect(() => {
    const totalLectureTime = () => {
      let totalDurationInSeconds = 0;
      section?.subSections?.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
      setTotalDuration(totalDurationInSeconds);
    };
    totalLectureTime();
  }, []);

  return (
    <div className=" bg-richblack-700 py-4 px-8">
      <div
        className="flex flex-row items-center justify-between"
      >
        <div className="flex flex-row gap-x-2 items-center">
          <CiCircleChevRight
            
          />
          <p>{section?.sectionName}</p>
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-between max-w-[170px] w-full">
          <p className="text-yellow-50">
            {section?.subSections?.length} Lectures
          </p>
          <p className="text-right">
            {convertSecondsToDuration(totalDuration)}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CourseSection;
