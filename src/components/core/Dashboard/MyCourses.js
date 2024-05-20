/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="grid flex-1 h-[80vh] w-screen place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="text-white desktop:ml-[18rem] mobile:mx-auto mobile:w-11/12 desktop:w-9/12 w-11/12 max-w-maxContent flex flex-col  mx-auto my-5">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl mobile:text-2xl font-medium">My Courses</h1>
          <IconBtn
            text={"Add Course"}
            textColor={true}
            bgColor={true}
            onclick={() => navigate("/dashboard/add-course")}
          />
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
      </div>
    </div>
  );
};

export default MyCourses;
