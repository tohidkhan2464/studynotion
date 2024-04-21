/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
// import thumbnailImage from "../../../assets/thumbnail.jpeg";
import { HiDotsVertical } from "react-icons/hi";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // const [totalDuration, setTotalDuration] = useState(0);
  // const course = {
  //   courseName: "Web Dev",
  //   courseDescription: "A complete Web Dev course",
  //   instructor: "Tk",
  //   whatYouWillLearn: "You will learn about Web Dev",
  //   price: "1000",
  //   thumbnail: `${thumbnailImage}`,
  //   category: "Dev",
  //   totalDuration: "1hr 30 mins",
  //   progressPercentage: "",
  // };

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
    // setEnrolledCourses(course);
  }, []);

  return (
    <div className="text-white w-11/12 desktop:ml-[20rem] desktop:w-9/12 max-w-maxContent flex flex-col  mx-auto my-5">
      <div className="text-4xl mobile:text-2xl font-medium">
        Enrolled Courses
      </div>
      {!enrolledCourses ? (
        <div className="mt-[20rem] ml-[41rem] spinner"></div>
      ) : !enrolledCourses.length ? (
        <p className="text-center mt-[20%] text-4xl mobile:2xl font-semibold">
          You have not enrolled in any course yet
        </p>
      ) : (
        <div>
          <div className="flex flex-row items-center bg-richblack-500 p-4 text-richblack-300 text-sm font-medium border-[1px] rounded-t-xl mt-5 border-richblack-500">
            <p className="w-[50%] ">Course Name</p>
            <p className="w-[25%] ">Durations</p>
            <p className="w-[25%] ">Progress</p>
          </div>

          {/* Cards start */}
          {enrolledCourses.map((course, index) => (
            <div
              key={index}
              className={`flex flex-row items-center  p-4 border-[1px] border-richblack-500 ${
                index === -1 ? " rounded-b-xl" : "rounded-none"
              } `}
            >
              <div className="flex flex-row w-[50%] gap-x-4 items-center">
                <img
                  src={course.thumbnail}
                  alt="course thumbnail"
                  className="h-[3.5rem] w-[3.5rem]"
                />
                <div className="flex flex-col gap-1 text-base">
                  <p>{course.courseName}</p>
                  <p className="text-richblack-300 ">
                    {course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-[25%] text-base font-medium ">
                {course?.timeDuration}
              </div>

              <div className=" w-[25%] flex flex-row gap-2 items-center">
                <div className="w-[80%] flex flex-col gap-y-2">
                  <p className=" text-sm font-semibold">
                    Progress: {course.progressPercentage || 65}%
                  </p>
                  <ProgressBar
                    completed={course.progressPercentage || 65}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
                <HiDotsVertical className="text-2xl" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
