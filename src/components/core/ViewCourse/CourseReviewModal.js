import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import { RxCross1 } from "react-icons/rx";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperinece", "");
    setValue("courseRating", 0);
  });

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white text-white bg-opacity-10 backdrop-blur-sm">
      <div className=" flex flex-col rounded-lg bg-richblack-900 overflow-hidden w-[500px]">
        {/* modal header */}
        <div className="flex flex-row justify-between items-center bg-richblack-700 px-4 py-3 w-full">
          <p>Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross1 />
          </button>
        </div>

        <div className="my-4">
          <div className="flex flex-row items-center justify-center">
            <img
              src={user?.image}
              alt="Profile"
              className=" aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col px-3 text-sm">
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p>Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div className="w-full px-10">
              <label
                htmlFor="courseExperince"
                className="text-[0.875rem] text-richblack-5 mb-1 ml-1 leading-[1.375rem]"
              >
                Add Your Experience <sup className=" text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperince"
                placeholder="Add your Experince here"
                {...register("courseExperience", { required: true })}
                className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 min-h-[130px] mt-2 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)] "
              />
              {errors.CourseExperience && (
                <span>Please add your Experience</span>
              )}
            </div>
            <div className="flex flex-row items-center justify-end px-10 w-full gap-x-4">
              {/* cancel and save button */}
              <IconBtn
                onclick={() => setReviewModal(false)}
                text={"Cancel"}
                type={"button"}
                textColor={false}
                bgColor={false}
              />
              <IconBtn
                text={"Save"}
                type={"submit"}
                textColor={true}
                bgColor={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
