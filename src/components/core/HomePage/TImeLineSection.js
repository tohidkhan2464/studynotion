import React from "react";
import logo1 from "../../../assets/Timeline Logos/Logo1.svg";
import logo2 from "../../../assets/Timeline Logos/Logo2.svg";
import logo3 from "../../../assets/Timeline Logos/Logo3.svg";
import logo4 from "../../../assets/Timeline Logos/Logo4.svg";
import timelineImage from "../../../assets/timline Image.png";

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
      <div className="flex flex-row gap-16 items-center">
        <div className="w-[45%] flex flex-col gap-5 ">
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
          {/* <div className="h-[280px] w-[200px] "></div> */}
          <img
            src={timelineImage}
            alt="timeLine"
            className="shadow-white object-cover h-fit"
          />
          <div className=" absolute bg-caribeangreen-700 flex flex-row text-white uppercase py-7
           left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex flex-row gap-5 items-center border-r border-caribeangreen-300 px-7">
              <p className="text-3xl font-bold">10</p>
              <p className=" text-caribeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>
            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className=" text-caribeangreen-300 text-sm">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TImeLineSection;
