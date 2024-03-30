import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./Course Information/CourseInformationForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center ">
        {steps.map((item) => (
          <>
            <div className="flex flex-col items-center">
              <div
                className={`grid cursor-default aspect-square w-[45px] h-[45px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } transition-all duration-2 ${
                  step > item.id ? "bg-yellow-50 text-yellow-900" : ""
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
            </div>
            {/* Add code for Dashes between the labels */}
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(45px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="flex relative mb-5 w-full select-none justify-between px-10">
        {steps.map((item) => (
          <>
            <div
              className={`flex min-w-[130px] flex-col items-center gap-y-2 rounded-full ${
                step === item.id ? " text-richblack-5" : " text-richblack-300"
              }`}
            >
              <p>{item.title}</p>
            </div>
          </>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {/* {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />} */}
    </>
  );
};

export default RenderSteps;
