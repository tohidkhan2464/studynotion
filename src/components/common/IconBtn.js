import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customclasess,
  type,
  bgColor,
  textColor,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`mt-2 w-fit rounded-[8px]  py-[10px] px-[24px] cursor-pointer items-center drop-shadow-[2px_2px_0px_#424854] transition-all duration-200 hover:-translate-y-1 
      ${bgColor ? "bg-yellow-50" : " bg-richblack-700"} ${customclasess}
      ${textColor ? "text-richblack-900" : "text-richblack-5"}`}
    >
      {children ? (
        <>
          <span className="text-xl">{text}</span>
          {children}
        </>
      ) : (
        text
      )}
      
    </button>
  );
};

export default IconBtn;
