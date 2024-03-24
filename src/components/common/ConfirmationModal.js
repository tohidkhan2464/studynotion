import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="text-white  flex items-center top-[50%] justify-center h-[calc(100vh-3.5rem)] w-screen backdrop-blur-md py-4 ">
        <div className=" bg-richblack-700 z-[1000] border-[1px] border-richblack-700 py-8 px-10 rounded-xl flex items-center justify-center flex-col  gap-10">
            <p className="text-4xl font-semibold">{modalData.text1}</p>
            <p className="text-2xl">{modalData.text2}</p>
            <div className="text-white flex flex-row items-center justify-between w-full">
              
                <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text}  />
                <button onClick={modalData?.btn2Handler} className="text-center px-6 py-3 rounded-md font-bold drop-shadow-[1px_1.5px_rgba(255,255,255,0.25)]
                bg-richblack-600 hover:scale-95 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-pure-greys-700">
                    {modalData.btn2Text}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;