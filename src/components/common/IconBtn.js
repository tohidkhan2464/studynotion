import React from "react";

const IconBtn = ({
    text, onclick, children, disabled, outline=false, customlasess, type
}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className="text-center px-6 py-3 rounded-md font-bold drop-shadow-[1px_1.5px_rgba(255,255,255,0.25)]
    bg-yellow-50 text-black hover:scale-95 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-pure-greys-700" >
        {
            children? (
                <>
                    <span className="text-3xl">
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
    </button>
  );
};

export default IconBtn;