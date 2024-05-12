import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import InstrutorChart from "./InstrutorChart";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);
      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="text-white w-11/12 desktop:ml-[20rem] desktop:w-9/12 max-w-maxContent flex flex-col  mx-auto my-5">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl">Hi, {user?.firstName} 👋👋</h1>
        <p>Let's start something new</p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div className="mt-4 flex flex-col gap-y-10">
          <div>
            <div className="flex flex-row gap-x-10">
              <div className="w-full">
                <InstrutorChart courses={instructorData} />
              </div>
              <div className="flex flex-col gap-y-4 bg-richblack-800 w-[40%] rounded-lg px-8 py-4">
                <p className="text-xl font-semibold">Statistics</p>
                <div>
                  <p className=" text-richblack-300 text-lg">Total Courses</p>
                  <p className=" text-richblack-5 text-3xl">{courses.length}</p>
                </div>
                <div>
                  <p className=" text-richblack-300 text-lg">Total Students</p>
                  <p className=" text-richblack-5 text-3xl">{totalStudents}</p>
                </div>
                <div>
                  <p className=" text-richblack-300 text-lg">Total Income</p>
                  <p className=" text-richblack-5 text-3xl">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-richblack-800 px-8 py-4 rounded-lg">
            {/* Render the courses  */}
            <div className="flex flex-row items-center justify-between">
              <p className="text-xl font-semibold">Your Courses</p>
              <Link to={"/dashboard/my-courses"}>
                <p className="text-xl font-semibold text-yellow-5 px-6 py-3 hover:bg-richblack-900 rounded-lg">
                  View all
                </p>
              </Link>
            </div>
            <div className="flex flex-row gap-x-5 mt-4">
              {courses.slice(0, 3).map((course) => (
                <div>
                  <img src={course?.thumbnail} alt="Course thumbnail" />
                  <div className="mt-4 flex flex-col gap-y-1">
                    <p className="text-sm">{course?.courseName}</p>
                    <p className="text-sm  text-richblack-300">
                      Students Enrolled: {course?.studentsEnrolled?.length} |
                      Price: Rs {course?.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" bg-richblack-800 p-8 rounded-lg flex flex-col items-center justify-center mt-4 w-full min-h-[30rem] gap-y-4">
          <p className="text-xl font-semibold">
            You have not created any courses yet
          </p>
          <Link to={"/dashboard/add-course"}>
            <p className="text-xl font-semibold text-yellow-5 px-6 py-3 hover:bg-richblack-900 rounded-lg">
              Create a Course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
