import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/api";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import Error from "./Error";

const Catalog = () => {
  const { catalogName } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const [catalogPageData, setCatalogPageData] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  // fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector({
        method: "GET",
        url: categories.CATEGORIES_API,
      });

      const category_id = res?.data?.data?.filter(
        (category) =>
          category.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
      // console.log("category id", category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        // console.log("object catalog", categoryId);
        const res = await getCatalogPageData({ categoryId });
        console.log("get catalog data", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) return <Error />;

  return (
    <div className="text-richblack-5 bg-richblack-900">
      <section className="bg-richblack-800 text-white">
        <div className="py-[50px] pt-[100px] mobile:pt-[70px] w-11/12 max-w-maxContent mx-auto mobile:items-center mobile:mx-auto">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl my-4 text-richblack-5">
            {catalogPageData.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData.data?.selectedCategory?.description}
          </p>
        </div>
      </section>

      <div className="py-[50px] pt-[50px] mobile:pt-[70px] w-11/12 max-w-maxContent mx-auto mobile:items-center mobile:mx-auto">
        {/* Section 1 */}
        <div className=" mx-auto box-content w-full px-4 py-12">
          <div className="text-2xl font-bold text-richblack-5 desktop:text-4xl">
            Courses to get you started
          </div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
              className={`px-4 py-2 ${
                active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer transition-all duration-200`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </p>
            <p
              className={`px-4 py-2 ${
                active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer transition-all duration-200`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div className="w-full">
            <CourseSlider
              courses={catalogPageData.data?.selectedCategory?.courses}
            />{" "}
          </div>
        </div>

        {/* Section 2 */}
        <div className=" mx-auto box-content w-full px-4 py-12">
          <p className="text-2xl font-bold text-richblack-5 desktop:text-4xl">
            Top Courses in {catalogPageData.data?.selectedCategory?.name}
          </p>
          <div className="py-8">
            <CourseSlider
              courses={catalogPageData.data?.differentCategory?.courses}
            />{" "}
          </div>
        </div>

        {/* Section 3 */}
        <div className=" mx-auto box-content w-full px-4 py-12 ">
          <div className="text-2xl font-bold text-richblack-5 desktop:text-4xl">
            Frequently Bought
          </div>
          <div className="py-8">
            <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
              {catalogPageData.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <CourseCard
                    course={course}
                    key={index}
                    Height={"h-[400px]"}
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

export default Catalog;
