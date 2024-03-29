import React from "react";
import { Link } from "react-router-dom";

const Button = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 w-full rounded-md font-bold drop-shadow-[1px_1.5px_rgba(255,255,255,0.25)]
        ${active ? "bg-yellow-50 text-black": "bg-richblack-800" } hover:scale-95 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-pure-greys-700`}>
            {children}
        </div>
    </Link>
  );
};

export default Button;