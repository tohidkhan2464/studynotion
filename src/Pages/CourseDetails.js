/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import CourseDetailsCard from "../components/core/CourseDetails/CourseDetailsCard";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import { formattedDate } from "../utils/dateformatter";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { GoDotFill } from "react-icons/go";
import Error from "./Error";
import Footer from "../components/common/Footer";
import CourseSection from "../components/core/CourseDetails/CourseSection";
import { buyCourse } from "../services/operations/studentFeaturesApi";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [totalDuration, setTotalDuration] = useState("");
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isVisible, setIsVisible] = useState(Array(0));
  const [isActive, setIsActive] = useState(Array(0));
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const handleVisible = (id) => {
    setIsVisible(
      !isVisible.includes(id)
        ? isVisible.concat([id])
        : isVisible.filter((e) => e !== id)
    );
  };
  useEffect(() => {
    const count = GetAvgRating(courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseDetails]);

  useEffect(() => {
    const getCourseDetails = async () => {
      const result = await fetchCourseDetails(courseId);
      if (result.success) {
        setCourseDetails(result?.data?.courseDetails);
        setTotalDuration(result?.data?.totalDuration);
      } else {
        return <Error />;
      }
    };
    getCourseDetails();
  }, [courseId]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    let lectures = 0;
    courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec?.subSections?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseDetails]);

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseDetails) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="text-richblack-5 bg-richblack-900">
      {/* Hero Section 1 */}
      <section className="bg-richblack-800 text-white h-fit mobile:max-h-fit max-h-[340px]">
        <div className="pt-[20px] mobile:pt-[10px] flex flex-row mobile:flex-col gap-x-10 w-11/12 h-full max-w-maxContent mx-auto mobile:items-center mobile:mx-auto">
          <div className="pt-5 w-[calc(100%-400px)] mobile:w-[100%] mx-auto mobile:items-center mobile:mx-auto mobile:border-none border-r-[1px] h-full border-richblack-500 pr-10 ">
            <div className="h-fit">
              <p className="text-sm text-richblack-300">
                {/* {`Home / Catalog / `} */}
                <span onClick={() => navigate("/")}>Home / &nbsp;</span>
                <span onClick={() => navigate("/all-courses")}>
                  Catalog /&nbsp;{" "}
                </span>
                <span className="text-yellow-25">
                  {courseDetails.courseName}
                </span>
              </p>
              <p className="text-3xl mobile:text-xl my-2 text-richblack-5">
                {courseDetails.courseName}
              </p>
              <p className=" text-richblack-200">
                {courseDetails?.courseDescription
                  ?.split(" ")
                  .slice(0, 30)
                  .join(" ") + " ..."}
              </p>
              <div className="flex text-base mt-2 items-center gap-2">
                <span className="text-yellow-5">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
                <span className="text-richblack-400">
                  ({courseDetails?.ratingAndReviews?.length || 0} Ratings)
                </span>
                <span>
                  {courseDetails?.studentsEnrolled?.length || 0} Students
                </span>
              </div>
              <p className="flex text-base mt-2 items-center gap-2">
                Created By {courseDetails?.instructor?.firstName}{" "}
                {courseDetails?.instructor?.lastName}
              </p>
              <p className="flex text-base mt-2 items-center gap-2">
                Created On {formattedDate(courseDetails?.createdAt)}
              </p>
            </div>
          </div>
          <div className="max-w-[350px] mobile:max-w-[100%] mobile:mt-5 w-full">
            <CourseDetailsCard
              course={courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className=" text-white h-fit">
        <div className="mt-[20px] mobile:mt-[10px] flex flex-row gap-x-10 w-11/12 max-w-maxContent mx-auto mobile:items-center mobile:mx-auto">
          <div className="mt-5 w-[calc(100%-395px)] mobile:w-full mobile:items-center mobile:mx-auto border-[1px] h-fit border-richblack-500 ">
            <div className="p-8">
              <p className="text-3xl mobile:text-xl font-medium">
                What you'll learn
              </p>
              <div className="flex flex-col gap-y-1  mt-4 text-richblack-100">
                {courseDetails?.whatYouWillLearn
                  ?.split("\n")
                  .map((item, index) => (
                    <p className="text-base mobile:text-sm" key={index}>
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className=" text-white h-fit">
        <div className="mt-[20px] mobile:mt-[10px] flex flex-row gap-x-10 w-11/12 max-w-maxContent mx-auto mobile:items-center mobile:mx-auto">
          <div className="mt-5 w-[calc(100%-395px)] mobile:w-full mobile:items-center mobile:mx-auto  h-fit ">
            <div className="pt-8">
              <p className="text-3xl mobile:text-xl font-medium">
                Course Content
              </p>
            </div>
            <div className="flex items-center justify-between mobile:text-sm">
              <div className="flex flex-row mobile:flex-col gap-x-4 mt-2 text-richblack-300">
                <span className="flex flex-row gap-1 items-center">
                  {" "}
                  <GoDotFill />
                  {courseDetails?.courseContent?.length} Sections
                </span>
                <span className="flex flex-row gap-1 items-center">
                  <GoDotFill />
                  {totalNoOfLectures} Lectures
                </span>
                <span className="flex flex-row gap-1 items-center">
                  <GoDotFill />
                  {totalDuration} Total Length
                </span>
              </div>
              <div
                className="text-yellow-50"
                onClick={() => {
                  setIsVisible([]);
                  setIsActive([]);
                }}
              >
                <p>Collapse all Sections</p>
              </div>
            </div>

            {/* Section and subsections */}
            <div className="py-4">
              {courseDetails?.courseContent?.map((section, index) => (
                <CourseSection
                  key={index}
                  index={index}
                  last={courseDetails?.courseContent?.length}
                  section={section}
                  isVisible={isVisible}
                  isActive={isActive}
                  setIsActive={setIsActive}
                  handleVisible={handleVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className=" my-14 text-white h-fit">
        <div className=" flex flex-row gap-x-10 w-11/12 max-w-maxContent mx-auto mobile:items-center mobile:mx-auto">
          <div className="w-[calc(100%-395px)] mobile:w-full mobile:items-center mobile:mx-auto  h-fit pr-10 ">
            <p className="text-3xl mobile:text-xl font-medium">Author</p>
            <div className="flex flex-row gap-x-4 items-center">
              <img
                src={courseDetails?.instructor?.image}
                alt={`Profile of ${courseDetails?.instructor?.firstName}`}
                className="rounded-full overflow-hidden mobile:h-10 mobile:w-10 h-14 w-14 aspect-square mt-2"
              />
              <p className="mobile:text-sm">
                {courseDetails?.instructor?.firstName}{" "}
                {courseDetails?.instructor?.lastName}{" "}
              </p>
            </div>
            <p className="mt-2 mobile:text-sm text-richblack-50">
              I will be your lead trainer in this course. Within no time, I will
              help you to understand the subject in an easy manner. I have a
              huge experience in online training and recording videos. Let's get
              started!
            </p>
          </div>
        </div>
      </section>

      <Footer />
      {confirmationModal && (
        <div className="h-screen z-10 w-screen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
