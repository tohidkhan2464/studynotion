import React from "react";
import logo1 from "../../../assets/Timeline Logos/Logo1.svg";
import logo2 from "../../../assets/Timeline Logos/Logo2.svg";
import logo3 from "../../../assets/Timeline Logos/Logo3.svg";
import logo4 from "../../../assets/Timeline Logos/Logo4.svg";
import timelineImage from "../../../assets/Home_items/timline Image.png";

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    Description: "Fully commited to success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the Problem",
    Description: "Code your way to Solution",
  },
];

const TImeLineSection = () => {
  return (
    <div>
      <div className="flex flex-row mobile:flex-col largeMobile:flex-col gap-16 items-center">
        <div className="w-[45%] mobile:w-full flex flex-col gap-5 ">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-row gap-5" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                  <img src={element.logo} alt="logo1" />
                </div>
                <div>
                  <h2 className=" font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className=" text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative shadow-blue-100">
          <div className=" relative z-20">
            <div className=" absolute top-32 left-0 mobile:top-10 -z-[2] blur-3xl h-[250px] w-[630px] 
            mobile:w-[300px] mobile:h-[100px] largeMobile:w-[450px] largeMobile:h-[150px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]"></div>

            <div>
              <img
                src={timelineImage}
                alt="timeLine"
                className=" object-cover mobile:w-[300px] h-fit shadow-[20px_20px_rgba(255,255,255)]"
              />
            </div>
          </div>
          <div
            className=" absolute z-30 bg-caribeangreen-700 flex flex-row text-white uppercase py-7 mobile:flex-col mobile:gap-y-4 mobile:max-w-[320px]
           left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="flex flex-row gap-5 mobile:gap-3 items-center border-r mobile:border-none border-caribeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className=" text-caribeangreen-300 text-sm  ">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl  font-bold">250</p>
              <p className=" text-caribeangreen-300 text-sm ">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TImeLineSection;
