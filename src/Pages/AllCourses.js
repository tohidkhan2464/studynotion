import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import CourseCard from "../components/core/Catalog/CourseCard";
import { useSelector } from "react-redux";
import Error from "./Error";
import { getAllCourses } from "../services/operations/courseDetailsAPI";

const AllCourses = () => {
  const { loading } = useSelector((state) => state.profile);
  const [catalogPageData, setCatalogPageData] = useState();

  useEffect(() => {
    const getAllCoursesDetails = async () => {
      try {
        const res = await getAllCourses();
        // console.log("All courses", res);

        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCoursesDetails();
  }, []);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData) return <Error />;

  return (
    <div className="text-richblack-5 bg-richblack-900">
      <div className="py-[50px] pt-[50px] mobile:py-[20px] mobile:pt-[10px] w-11/12 max-w-maxContent mobile:max-w-screen mx-auto mobile:items-center">
        <div className=" mx-auto box-content w-full py-5 ">
          <div className="text-2xl font-bold text-richblack-5 desktop:text-4xl">
            All Available Courses
          </div>
          <div className="py-8">
            <div className="grid mobile:grid-cols-1 gap-6 grid-cols-2 largeScreen:grid-cols-3">
              {catalogPageData?.map((course, index) => (
                <CourseCard
                  course={course}
                  key={index}
                  Height={"h-[400px] mobile:h-[250px]"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCourses;
