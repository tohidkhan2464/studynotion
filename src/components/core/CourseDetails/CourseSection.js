import React, { useEffect, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { convertSecondsToDuration } from "../../../services/convertSecondsToDuration";
import CourseSubSection from "./CourseSubSection";
const CourseSection = ({
  section,
  isVisible,
  isActive,
  setIsActive,
  handleVisible,
  index,
  last,
}) => {
  const [totalDuration, setTotalDuration] = useState("");
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };
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
    <div
      className={`bg-richblack-700 mobile:text-sm ${
        index === 0 ? "rounded-t-xl" : "border-none"
      } ${index + 1 === last ? " rounded-b-xl" : "border-none"}`}
    >
      <div className="flex flex-row items-center mobile:px-3 py-4 justify-between px-8">
        <div
          className="flex flex-row gap-x-2 items-center"
          onClick={() => {
            handleVisible(section._id);
          }}
        >
          <FiChevronsRight
            className={`${
              isVisible?.includes(section._id) ? " rotate-90" : " rotate-0"
            }`}
          />
          <p className="mobile:max-w-[220px]">{section?.sectionName}</p>
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-between mobile:max-w-[150px] max-w-[170px] w-full">
          <p className="text-yellow-50">
            {section?.subSections?.length} Lectures
          </p>
          <p className="text-right">
            {convertSecondsToDuration(totalDuration)}
          </p>
        </div>
      </div>
      {isVisible?.includes(section._id) && (
        <div className="bg-richblack-900 py-4 px-8  mobile:px-3 border-[1px] border-richblack-600 ">
          {section?.subSections?.map((subSection, index) => (
            <CourseSubSection
              subSection={subSection}
              key={index}
              isActive={isActive}
              handleActive={handleActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
