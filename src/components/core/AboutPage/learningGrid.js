import React from "react";
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlighText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    btnText: "Learn more",
    btnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto lg:grid-cols-4 grid-cols-1 mb-10 ">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 h-[300px]  p-5"}
                    ${
                      card.order % 2 === 1
                        ? "bg-richblack-700"
                        : "bg-richblack-800"
                    }
                    ${card.order === 3 && "lg:col-start-2"}
                    ${card.order < 0 && "bg-transparent"}
                    `}
          >
            {card.order < 0 ? (
              <div className=" lg:w-[90%] flex flex-col gap-4 justify-center">
                <div className="text-4xl font-semibold">
                  {card.heading}
                  <span className="text-4xl font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-br from-[#5433FF] via-[#20BDFF] to-[#A5FECB]">
                    {" "}
                  {card.highlighText}
                  </span>
                  {/* <HighlightText text={card.highlighText} /> */}
                </div>
                <p className="font-medium text-richblack-300">{card.description}</p>
                <div className="w-fit mt-6">
                  <CTAButton active={true} linkto={card.btnLink}>
                    {card.btnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-9 h-[300px] flex flex-col justify-center gap-8">
                <h1 className="text-2xl font-semibold">{card.heading}</h1>
                <p className="text-richblack-300">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
