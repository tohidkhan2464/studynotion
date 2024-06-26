import React, { useEffect } from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  });
  return (
    <div className="text-white z-[1000] flex items-center justify-center h-screen w-screen -mt-14 mobile:mt-0 backdrop-blur  ">
      <div className=" bg-richblack-800 z-[1000] border-[1px] border-richblack-600 py-8 px-10 rounded-xl flex items-center justify-center flex-col  gap-10">
        <p className="text-4xl mobile:text-2xl font-semibold">
          {modalData.text1}
        </p>
        <p className="text-2xl mobile:text-xl ">{modalData.text2}</p>
        <div className="text-white flex flex-row items-center justify-between w-full">
          <IconBtn
            onclick={modalData?.btn1Handler}
            bgColor={true}
            textColor={true}
            text={modalData?.btn1Text}
            customclasess={"drop-shadow-[2px_1.5px_rgba(248,239,90, 1)]"}
          />
          <IconBtn
            onclick={modalData?.btn2Handler}
            text={modalData.btn2Text}
            bgColor={false}
            textColor={false}
            customclasess={"drop-shadow-[1px_1.5px_rgba(255,255,255,0.25)]"}
          ></IconBtn>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
