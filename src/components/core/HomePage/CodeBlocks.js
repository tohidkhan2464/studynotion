import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation';


const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeBlock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* section1 */}
      <div className="flex flex-col w-[50%] gap-8 justify-center">
        {heading}

        <div className=" text-richblack-300 font-bold">{subheading}</div>

        <div className=" flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section 2 */}
      <div className="flex relative z-10 flex-row justify-between h-fit text-md w-[100%] py-4 lg:w-[500px] code-border">
        <div className={`absolute -z-10 top-0 left-0 rounded-full blur-3xl opacity-50 ${backgroundGradient} h-[257px] w-[397px]`}></div>
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>            
        </div>
        <div className={`min-w-[90%] flex flex-col gap-2 font-bold text-nowrap font-mono ${codeColor} pr-2`}>
            <TypeAnimation 
                sequence={[codeBlock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
            />
            
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
