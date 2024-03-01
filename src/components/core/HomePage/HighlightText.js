import React from "react";

const HighlightText = ({text}) => {
  return (
    //TODO: apply gradient
    <span className=" font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
        {" "}{text}
    </span>
  );
};

export default HighlightText;