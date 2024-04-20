import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import thumbnailImage from "../../../../../assets/thumbnail.jpeg";
import { HiDotsVertical } from "react-icons/hi";
import { FiTrash2 } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { HiClock } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../../common/ConfirmationModal";

import { deleteCourse } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const enrolledCourses = [
  //   {
  //     courseName: "Introduction to Design: ",
  //     courseDescription:
  //       "A This course provides an overview of the This course focuses on creating visual communication through the use of typography, images, and color. design process, design thinking, and basic design principles. Web Dev course",
  //     instructor: "Tk",
  //     whatYouWillLearn: "You will learn about Web Dev",
  //     price: "1000",
  //     thumbnail: `${thumbnailImage}`,
  //     category: "Dev",
  //     totalDuration: "1hr 30 mins",
  //     progressPercentage: "60",
  //     status: "Published",
  //     createdAt: "July 2, 2004 | 10:00 PM",
  //   },
  //   {
  //     courseName: "Introduction to Design: ",
  //     courseDescription:
  //       "A This course provides an overview of the design process, design thinking, and basic design principles. Web Dev course",
  //     instructor:
  //       "This course provides an overview of the design process, design thinking, and basic design principles.",
  //     whatYouWillLearn: "You will learn about Web Dev",
  //     price: "1000",
  //     thumbnail: `${thumbnailImage}`,
  //     category: "Dev",
  //     totalDuration: "1hr 30 mins",
  //     progressPercentage: "60",
  //     status: "Drafted",
  //     createdAt: "July 2, 2004 | 10:00 PM",
  //   },
  //   {
  //     courseName: "Introduction to Design: ",
  //     courseDescription:
  //       "A This course provides an overview of the design process, design thinking, and basic design principles. Web Dev course",
  //     instructor:
  //       "This course provides an overview of the design process, design thinking, and basic design principles.",
  //     whatYouWillLearn: "You will learn about Web Dev",
  //     price: "1000",
  //     thumbnail: `${thumbnailImage}`,
  //     category: "Dev",
  //     totalDuration: "1hr 30 mins",
  //     progressPercentage: "60",
  //     status: "Drafted",
  //     createdAt: "July 2, 2004 | 10:00 PM",
  //   },
  //   {
  //     courseName: "Introduction to Design: ",
  //     courseDescription:
  //       "A This course provides an overview of the design process, design thinking, and basic design principles. Web Dev course",
  //     instructor:
  //       "This course provides an overview of the design process, design thinking, and basic design principles.",
  //     whatYouWillLearn: "You will learn about Web Dev",
  //     price: "1000",
  //     thumbnail: `${thumbnailImage}`,
  //     category: "Dev",
  //     totalDuration: "1hr 30 mins",
  //     progressPercentage: "60",
  //     status: "Drafted",
  //     createdAt: "July 2, 2004 | 10:00 PM",
  //   },
  // ];
  // const index = 1;
  // setEnrolledCourses(courseSample);

  const handleDeleteCourse = async (courseId) => {
    await deleteCourse({
      courseId,
      token,
    });

    setConfirmationModal(null);
    getEnrolledCourses();
  };

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
    <div className="flex items-center justify-center">
      <div className="text-white desktop:ml-[20rem] desktop:w-9/12 w-11/12 max-w-maxContent flex flex-col  mx-auto my-5">
        <div className="text-4xl mobile:text-2xl font-medium">My Courses</div>
        {!enrolledCourses ? (
          <div className="mt-[20rem] ml-[41rem] spinner"></div>
        ) : !enrolledCourses.length ? (
          <p className="text-center mt-[20%] text-4xl mobile:2xl font-semibold">
            You have not created any course yet
          </p>
        ) : (
          <div>
            <div className="flex flex-row items-center text-richblack-300 p-4  text-base font-medium border-[1px] border-b-[0px] rounded-t-xl mt-20 border-richblack-500">
              <p className="w-[70%] ">COURSES</p>
              <p className="w-[10%] text-center">DURATIONS</p>
              <p className="w-[10%] text-center">PRICE</p>
              <p className="w-[10%] text-center">ACTIONS</p>
            </div>

            {/* Cards start */}
            <div className="border-[1px] rounded-b-xl border-richblack-500">
              {enrolledCourses.map((course, index) => (
                <div>
                  {index !== 0 && (
                    <hr className="w-[90%] h-[1px] text-richblack-500 mx-auto" />
                  )}
                  <div
                    key={index}
                    className={`flex flex-row items-center  p-6`}
                  >
                    <div className="flex flex-row w-[70%] gap-x-4 items-center">
                      <div className="h-[9rem] w-[9rem] flex items-center justify-center p-2 rounded-xl ">
                        <img
                          src={course.thumbnail}
                          alt="course thumbnail"
                          className="rounded-xl max-h-[8rem] max-w-[8rem] h-full w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-3 px-4 ">
                        <p className="text-xl font-semibold">
                          {course.courseName}
                        </p>
                        <p className="text-richblack-300 text-base ">
                          {course.courseDescription
                            .split(" ")
                            .slice(0, 15)
                            .join(" ") + "..."}
                        </p>
                        <p className=" font-medium text-richblack-5">
                          {course.createdAt}
                        </p>
                        <div className=" flex flex-row gap-2 items-center bg-richblack-600 w-fit px-3 pr-4  py-1 rounded-2xl">
                          {course.status === "Published" ? (
                            <>
                              <HiCheckCircle className=" text-pink-50" />
                              <p className="text-pink-100">Published </p>
                            </>
                          ) : (
                            <>
                              <HiClock className=" text-yellow-25" />
                              <p className=" text-yellow-100">Drafted </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-[10%] text-richblack-300 text-center text-base font-medium ">
                      {course?.totalDuration}
                    </div>
                    <div className="w-[10%] text-richblack-300 text-center text-base font-medium ">
                      ₹ {course?.price}
                    </div>
                    <div className="w-[10%] text-richblack-300 flex flex-row gap-2 text-3xl items-center justify-center ">
                      <HiPencil className=" cursor-pointer hover:text-white" />
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Course Permanantly",
                            text2: "Selected Course will be deleted",
                            btn1Text: "Delete",
                            btn1Handler: () => handleDeleteCourse(course._id),
                            btn2Text: "Cancel",
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <FiTrash2 className="cursor-pointer hover:text-white  text-richblack-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {confirmationModal && (
        <div className="h-screen z-10 w-screen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </div>
  );
};

export default MyCourses;
