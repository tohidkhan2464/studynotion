/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { IoChevronBackOutline } from "react-icons/io5";
import { resetCourseSection, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  // Next and Back Button of nested view
  const gotoBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseSection());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      // check if form has been updated or not

      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated  no need to make api call
      goToCourses();
      return;
    }
    // if form updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblue-5">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              {" "}
              Make this course as public{" "}
            </span>
          </label>
        </div>
        <div className="flex mt-10 z-50 justify-end gap-x-3">
          <IconBtn
            text="Back"
            type="button"
            onclick={gotoBack}
            disabled={loading}
            customclasess={"flex flex-row-reverse gap-2 items-center"}
            bgColor={false}
            textColor={false}
          >
            <IoChevronBackOutline className="text-xl" />
          </IconBtn>
          <IconBtn
            text={loading ? "loading..." : "Save changes"}
            disabled={loading}
            bgColor={true}
            textColor={true}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
