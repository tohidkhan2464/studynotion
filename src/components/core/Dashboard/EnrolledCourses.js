/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setCourseData(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white w-11/12 desktop:ml-[20rem] desktop:w-9/12 max-w-maxContent flex flex-col  mx-auto my-5">
      <div className="text-4xl mobile:text-2xl font-medium">
        Enrolled Courses
      </div>
      {!courseData ? (
        <div className="mt-[20rem] ml-[41rem] spinner"></div>
      ) : !courseData.length ? (
        <p className="text-center mt-[20%] text-4xl mobile:2xl font-semibold">
          You have not enrolled in any course yet
        </p>
      ) : (
        <div>
          <div className="flex flex-row items-center bg-richblack-500 p-4 text-richblack-50 text-sm font-medium border-[1px] rounded-t-xl mt-5 border-richblack-500">
            <p className="w-[60%] mobile:w-[50%] flex items-center justify-center">
              Course Name
            </p>
            <p className="w-[20%] mobile:w-[25%] flex items-center justify-center">
              Durations
            </p>
            <p className="w-[20%] mobile:w-[25%] flex items-center justify-center">
              Progress
            </p>
          </div>

          {/* Cards start */}
          {courseData.map((course, index) => (
            <div
              key={index}
              className={`flex flex-row items-center  p-4 border-[1px] border-richblack-500 ${
                index === -1 ? " rounded-b-xl" : "rounded-none"
              } `}
            >
              <div
                className="flex flex-row w-[60%] mobile:w-[50%] mobile:flex-col gap-x-4 items-center"
                onClick={() => {
                  navigate(
                    `/view-course/${course?.courseDetails?._id}/section/${course?.courseDetails?.courseContent?.[0]?._id}/sub-section/${course?.courseDetails?.courseContent?.[0]?.subSections?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course?.courseDetails?.thumbnail}
                  alt="course thumbnail"
                  className="h-[5rem] mobile:w-[90%] w-[6rem] object-contain rounded-lg"
                />
                <div className="flex flex-col mobile:mt-2 gap-1 text-base">
                  <p>{course?.courseDetails?.courseName}</p>
                  <p className="text-richblack-300 mobile:text-xs text-sm ">
                    {course?.courseDetails?.courseDescription
                      .split(/[;, ]/)
                      .slice(0, 15)
                      .join(" ") + "..."}
                  </p>
                </div>
              </div>
              <div className="w-[20%] mobile:w-[25%] text-base font-medium flex items-center justify-center">
                {course?.totalDuration}
              </div>

              <div className=" w-[20%] mobile:w-[25%] flex flex-row gap-2 justify-center items-center">
                <div className="w-[100%] flex flex-col gap-y-2">
                  <p className=" text-sm font-semibold whitespace-nowrap mobile:text-xs">
                    Progress: {course.courseProgress || 0}%
                  </p>
                  <ProgressBar
                    completed={course.courseProgress || 0}
                    height="8px"
                    isLabelVisible={false}
                    className="mobile:h-[4px] h-[8px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
