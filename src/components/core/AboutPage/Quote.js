import React from "react";
import HighlightText from "../HomePage/HighlightText";
import open from '../../../assets/About/Open “.svg';
import closed from '../../../assets/About/CLosed “.svg';

const Quote = () => {
  return (
    <div className=" text-4xl relative  ">
      <img src={open} alt="quote" className=" text-richblack-700 absolute left-10 -top-1"/>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"}/>,
        <span className="font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]"> 
            {" "}
            expertise
        </span>
        , and community to create an
        <span className=" font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00] to-[#F9D423]"> 
            {" "}
            unparalleled educational experience
        </span>
        <img src={closed} alt="quote" className=" text-richblack-700 absolute right-40 bottom-5"/>
    </div>
  );
};

export default Quote;