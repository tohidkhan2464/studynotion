/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoArrowBackCircle } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSections.findIndex((data) => data._id === subSectionId);
      const activeSubsectionId =
        courseSectionData?.[currentSectionIndex]?.subSections?.[
          currentSubSectionIndex
        ]?._id;
      // set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      // set current sub-section here
      setVideoBarActive(activeSubsectionId);
    })();
  }, [courseEntireData, courseSectionData, location.pathname]);

  return (
    <div className=" absolute top-0 left-0 max-w-[300px] w-full text-richblack-5 bg-richblack-800 h-full ">
      <div className="transition-all relative duration-200">
        {/* for buttons and headings */}
        <div className=" mx-5 border-b-[2px] border-b-richblack-700">
          {/* for buttons */}
          <div className="flex flex-row justify-between items-center  py-5">
            <div
              className="h-full w-[50%] py-1 "
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              <IoArrowBackCircle className="h-9 w-9" />
            </div>

            <div>
              <IconBtn
                text={"Add Review"}
                textColor={true}
                bgColor={true}
                onclick={() => setReviewModal(true)}
                customclasess={"whitespace-nowrap"}
              />
            </div>
          </div>
          {/* for heading */}
          <div className="flex flex-col mb-2">
            <p className=" font-semibold text-xl">
              {courseEntireData?.courseName}
            </p>
            <p className="text-richblack-300 text-base -mt-1">
              {completedLectures.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>
        {/* for section and subsection */}
        <div className="mt-2 text-[16px]">
          {courseSectionData.map((section, index) => (
            <div onClick={() => setActiveStatus(section?._id)} key={index}>
              {/* section */}
              <div className=" flex flex-row justify-between items-center text-base px-5 bg-richblack-700 rounded-sm mt-1  py-1">
                <div>{section?.sectionName}</div>

                <SlArrowDown
                  className={`h-[12px] w-[12px] transition-all duration-200 ${
                    activeStatus === section?._id ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
              {/* subsections */}
              <div className=" text-sm">
                {activeStatus === section?._id && (
                  <div>
                    {section.subSections.map((subSection, index) => (
                      <div
                        key={index}
                        className={` flex gap-3 px-5 py-1 ${
                          videoBarActive === subSection?._id
                            ? " bg-yellow-50 text-richblack-900"
                            : " bg-richblack-800 text-richblack-5 hover:bg-richblack-900"
                        }`}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                          );
                          setVideoBarActive(subSection?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(subSection._id)}
                          onChange={() => {}}
                        />
                        <span className=" text-sm">{subSection?.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
