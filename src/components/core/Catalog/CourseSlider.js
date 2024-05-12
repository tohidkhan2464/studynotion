import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CourseCard from "./CourseCard";

const CourseSlider = ({ courses }) => {
  console.log("courses slider", courses)
  return (
    <div className="w-full">
      {courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          breakpoints={{ 1024: { slidesPerView: 3 } }}
          className="max-h-[30rem]"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No Courses Found</div>
      )}
    </div>
  );
};

export default CourseSlider;
