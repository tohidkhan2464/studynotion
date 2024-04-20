import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { BsPlusCircleDotted } from "react-icons/bs";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // For cancel Button
  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  // Next and Back Button of nested view
  const gotoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const gotoNext = () => {
    // if course doesnot contain any section
    if (course?.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }

    // if section doesnot contain any Subsection
    if (
      course?.courseContent.some((section) => section?.subSections.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    //If eberything is alright
    dispatch(setStep(3));
  };

  // on form submit
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      //we are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      // create Section
      result = await createSection({
        data: {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token: token,
      });
    }

    //update Values
    if (result) {
      console.log("RESULT AFTER SECTION CREATION/UPDATION IN COURSE BUILDER ", result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
      setLoading(false);
    }
  };

  // for nested view
  const hadnleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblue-5">Course Builder</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-4 border-[1px]"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name<sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className=" bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section Name is required
            </span>
          )}
        </div>

        {/* Button */}
        <div className="flex gap-4 items-end">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customclasess={"flex flex-row gap-2 items-center text-yellow-50"}
          >
            <BsPlusCircleDotted className="text-yellow-50" fontSize={20} />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/*Nested View  */}
      {course?.courseContent.length > 0 && (
        <NestedView hadnleChangeEditSectionName={hadnleChangeEditSectionName} />
      )}

      {/* Buttons */}
      <div className="flex z-50 justify-end gap-x-3">
        <IconBtn
          text="Back"
          onclick={gotoBack}
          disabled={loading}
          customclasess={"flex flex-row-reverse gap-2 items-center"}
          bgColor={false}
          textColor={false}
        >
          <IoChevronBackOutline className="text-xl" />
        </IconBtn>
        <IconBtn
          text="Next"
          onclick={gotoNext}
          disabled={loading}
          customclasess={"flex flex-row gap-2 items-center"}
          bgColor={true}
          textColor={true}
        >
          <IoChevronForwardOutline className="text-xl" />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
