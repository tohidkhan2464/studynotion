import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import ChipInput from "./ChipInput";
import Upload from "./Upload";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const dispatch = useDispatch();

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("coursetags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      //  currentValues.coursetags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      //   currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  //   handle next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.coursetags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.coursetags));
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("courseName", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("courseName", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        // console.log("FORM DATA", formData);
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO CHANGES made to the form");
      }
      return;
    }

    // create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("thumbnail", data.courseImage);
    formData.append("tag", JSON.stringify(data.coursetags));
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    // console.log("FORM DATA", formData);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
      dispatch(setCourse(result));
    }
    setLoading(false);
    // console.log("FORM DATA", formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-20">
      <div className="rounded-md border-richblack-700 border-[1px] bg-richblack-800 mt-10 p-8 space-y-8">
        <div>
          <label
            htmlFor="courseTitle"
            className="text-base text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Course Title
            <sup className=" text-pink-200">*</sup>
          </label>
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className=" bg-richblack-700 mt-2 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.courseTitle && (
            <p className=" text-red-500 mt-2">Course Title is Required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="courseShortDesc"
            className="text-base text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Course Short Description<sup className=" text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShrtDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className=" bg-richblack-700 min-h-[140px] mt-2 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.courseShortDesc && (
            <p className=" text-red-500 mt-1">Course Description is Required</p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="coursePrice"
            className="text-base text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Course Price
            <sup className=" text-pink-200">*</sup>
          </label>
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className=" bg-richblack-700 mt-2 rounded-[0.5rem] pl-10 text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
          />
          <HiOutlineCurrencyRupee
            className={`absolute h-6 w-6 text-richblack-400 ${
              errors.coursePrice ? "top-[50%]" : "top-[70%]"
            }  left-2 translate-y-[-50%]`}
          />
          {errors.coursePrice && (
            <p className=" text-red-500 mt-2">Course Price is Required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="courseCategory"
            className="text-base text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Course Category <sup className=" text-pink-200">*</sup>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            className=" bg-richblack-700 mt-2 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <p className=" text-red-500 mt-2">Course Category is Required</p>
          )}
        </div>
        {/* Create a custom component for handling tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Create a component for uploading and storing preview of media */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        <div>
          <label
            htmlFor="courseBenefits"
            className="text-base text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Benefits of the Course <sup className=" text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter benefits of the Course"
            {...register("courseBenefits", { required: true })}
            className=" bg-richblack-700 min-h-[130px] mt-2 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.courseBenefits && (
            <p className=" text-red-500 mt-1">Benefits of the Required</p>
          )}
        </div>

        <RequirementField
          name="courseRequirements"
          label="Requirements/Instruction"
          register={register}
          errors={errors}
          getValues={getValues}
          setValue={setValue}
        />
      </div>

      <div className="mt-2 text-right">
        {editCourse && (
          <button onClick={() => dispatch(setStep(2))}>
            Continue without Saving
          </button>
        )}
        <IconBtn
          text={!editCourse ? "Next" : "Save changes"}
          textColor={true}
          bgColor={true}
          type={"submit"}
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;
