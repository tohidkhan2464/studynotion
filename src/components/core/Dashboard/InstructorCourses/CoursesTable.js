import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { Table, tbody, td, th, Thead, tr } from "react-super-responsive-table";
// import { formatDate } from "../../../../services/formatDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { HiClock } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import { HiPencil } from "react-icons/hi2";
import { formattedDate } from "../../../../utils/dateformatter";

export default function CoursesTable({ courses, setCourses }) {
  console.log("Courses in course Table", courses);
  // const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className=" text-richblack-5 pt-24 mobile:pt-10">
      <table>
        <thead className="mt-20 mobile:mt-10">
          <tr className="flex flex-row items-center gap-x-10 text-richblack-300 py-4 px-8 mobile:px-4 -ml-[.5px] border-[1px] border-b-[0px] rounded-t-xl border-richblack-500  text-base font-medium   ">
            <th className="flex flex-row mobile:text-sm w-[70%] gap-x-4 items-center justify-center">
              Courses
            </th>
            <th className="w-[20%] text-center mobile:text-sm flex items-center justify-center ">
              Duration / Price
            </th>
            {/* <th className="w-[10%] text-center mobile:text-sm flex items-center justify-center ">
              Price{" "}
            </th> */}
            <th className="w-[10%] text-center mobile:text-sm flex items-center justify-center ">
              Actions{" "}
            </th>
          </tr>
        </thead>
        <tbody className="border-[1px] rounded-b-xl border-richblack-500">
          {courses.length === 0 ? (
            <tr
              className={`flex gap-x-10 border-b-richblack-500 border-b-[1px] p-8`}
            >
              <td className="flex justify-center w-[100%] gap-x-4 text-4xl mobile:text-2xl items-center">
                No Courses Found
              </td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr
                key={course._id}
                className={`flex gap-x-10 mobile:gap-x-12 border-b-richblack-500 border-b-[1px] p-8 mobile:p-4`}
              >
                <td className="flex flex-row mobile:flex-col w-[70%] gap-x-4 mobile:gap-y-2 mobile:gap-x-0 mobile:items-start items-center">
                  <div className="h-[9rem] w-[9rem] mobile:h-full mobile:w-full flex items-center justify-center p-2 mobile:p-0 rounded-xl ">
                    <img
                      src={course?.thumbnail}
                      className="rounded-xl h-full w-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col gap-3 mobile:justify-start mobile:gap-y-2 px-4 mobile:px-0 ">
                    <p className="text-xl mobile:text-sm font-semibold">
                      {course.courseName}
                    </p>
                    <p className="text-richblack-300 mobile:text-xs text-base ">
                      {course.courseDescription
                        .split(" ")
                        .slice(0, 15)
                        .join(" ") + "..."}
                    </p>
                    <p className=" font-medium mobile:text-xs text-richblack-5">
                      Created: {formattedDate(course?.createdAt)}
                    </p>
                    <div className=" flex flex-row gap-2 mobile:text-xs items-center bg-richblack-600 w-fit px-3 pr-4  py-1 rounded-2xl">
                      {course.status === COURSE_STATUS.PUBLISHED ? (
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
                </td>
                <td className="w-[20%] text-richblack-300 flex-col  mobile:text-sm text-center text-base font-medium flex items-center justify-center ">
                  <span className="whitespace-nowrap">2hr 30min</span>
                  <span>{course.price}</span>
                </td>
                {/* <td className="w-[10%] text-richblack-300  mobile:text-sm text-center text-base font-medium flex items-center justify-center ">
                  {course.price}
                </td> */}
                <td className="w-[10%] text-richblack-300  mobile:text-xl flex flex-row mobile:flex-col gap-4 text-3xl items-center justify-center ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                  >
                    <HiPencil className=" cursor-pointer hover:text-white" />
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to Delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    <FiTrash2 className="cursor-pointer hover:text-white  text-richblack-300" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {confirmationModal && (
        <div className="h-screen z-10 w-screen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </div>
  );
}
