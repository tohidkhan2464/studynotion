import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import ReactStars from "react-stars";
import { ratingsEndpoints } from "../../services/api";
import { apiConnector } from "../../services/apiConnector";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const result = await apiConnector({
        method: "GET",
        url: ratingsEndpoints.REVIEWS_DETAILS_API,
      });
      if (result?.data?.success) {
        setReviews(result?.data?.data);
      }
    };
    fetchAllReviews();
  }, []);
  const breakPoints = {
    200: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    639: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1600: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  return (
    <div className=" text-white mobile:max-w-[480px]  mobile:w-11/12">
      <div className="min-h-[190px] max-w-maxContent mobile:w-[100%] my-10 mb-20">
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          breakpoints={breakPoints}
          autoplay={{
            delay: 2500,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="bg-richblack-800 p-4 py-5 min-h-[160px] rounded-lg"
            >
              <div className="flex flex-row gap-x-2 items-center w-full">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/7.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  className="h-9 w-9 rounded-full object-cover"
                  alt="Profile Pic"
                />
                <div className="flex flex-col gap-y-1 justify-center w-full text-xs">
                  <p className="font-semibold">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>
                  <p className=" text-richblack-300 -mt-1">
                    {review?.course?.courseName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-0">
                <p className=" text-xs mt-2 text-richblack-100">
                  {review?.review.length > truncateWords
                    ? review?.review.split(/[;, ]/).slice(0, 15).join(" ") +
                      "..."
                    : review?.review}
                </p>
                <div className="flex flex-row items-center gap-x-2">
                  <p className="text-sm">{review?.rating}</p>
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    color2="#ffd700"
                    half={true}
                    value={review?.rating}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
