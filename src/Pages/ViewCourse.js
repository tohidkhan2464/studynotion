import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      setLoading(true);
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSections.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
      setLoading(false);
    };

    setCourseSpecificDetails();
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-[calc(100vh - 3.5rem)] mobile:min-h-[calc(100vh-3rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full mobile:min-h-[calc(100vh-3rem)]">
          <div className="mx-auto w-full ">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && (
        <div className="h-full z-10 w-screen ">
          <CourseReviewModal setReviewModal={setReviewModal} />{" "}
        </div>
      )}
    </>
  );
};

export default ViewCourse;
