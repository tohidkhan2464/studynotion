import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className=" font-bold text-richblue-200 mobile:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
        {" "}{text}
    </span>
  );
};

export default HighlightText;