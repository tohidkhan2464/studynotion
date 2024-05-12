import React from "react";
import instructor from "../../../assets/Home_items/instructor.jpg";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-row mobile:flex-col largeMobile:flex-col gap-20 mobile:justify-center mobile:text-center mobile:items-center mobile:gap-y-10 items-center">
        <div className="w-[50%] mobile:w-full largeMobile:w-full ">
          <img
            src={instructor}
            alt="Instructor"
            className=" mobile:w-10/12 largeMobile:w-10/12 largeMobile:mx-auto mobile:mx-auto shadow-[-20px_-20px_rgba(255,255,255)]"
          />
        </div>

        <div className="w-[50%] mobile:w-full largeMobile:w-full flex flex-col mobile:gap-5 gap-20 ">
          <div className="text-4xl mobile:text-xl mobile:w-full largeMobile:w-full font-semibold w-[50%]">
            Become an <HighlightText text={"Instructor"} />
          </div>
          <p className=" font-medium text-[16px] mobile:w-full largeMobile:w-full w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="mobile:flex mobile:mx-auto largeMobile:flex largeMobile:mx-auto w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
