import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from '../../../assets/Home_items/know your progress.png'
import plan_eith_lessons from '../../../assets/Home_items/Plan your lessons.png'
import compare_with_others from '../../../assets/Home_items/Compare with others.png'
import CTAButton from './Button'

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px] mb-32 mobile:mb-5">
      <div className="flex flex-col gap-5 mobile:gap-0 items-center">
        <div className="text-4xl mobile:text-2xl font-semibold text-center">
          Your Swiss Knife for <HighlightText text={"learning any Language"} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center mobile:flex-col largeMobile:flex-col largeMobile:gap-0 mobile:gap-0 justify-center mt-5 mobile:mt-5">
            <img src={know_your_progress} alt="know your progress" className=" object-contain mobile:w-[350px] largeMobile:w-[320px] mobile:m-0 largeMobile:m-0 -mr-32"/>
            <img src={compare_with_others} alt="Compare with others" className=" object-contain mobile:w-[350px] mobile:mt-[-70px] largeMobile:w-[350px] largeMobile:m-0 largeMobile:mt-[-70px] mobile:m-0"/>
            <img src={plan_eith_lessons} alt="Plan your lessons" className=" object-contain mobile:m-0 mobile:w-[350px] mobile:mt-[-90px] largeMobile:w-[350px] largeMobile:mt-[-90px] largeMobile:m-0 -ml-[150px]"/>
        </div>
        <div className="w-fit mobile:w-fit largeMobile:w-fit">
          <CTAButton active={true} linkto={'/signup'}>
            Learn more
          </CTAButton>
        </div>

      </div>
    </div>
  );
};

export default LearningLanguageSection;
