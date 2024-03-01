import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import banner from "../assets/video.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TImeLineSection from "../components/core/HomePage/TImeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";


const Home = () => {
  return (
    // TODO: MAtch the syling with original page
    <div>
      {/* Section 1 */}
      <div className=" relative mx-auto flex flex-col max-w-maxContent w-11/12 items-center justify-between text-white">
        <Link to={"/signup"}>
          <div
            className="mx-auto group rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit
          mt-16 p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
          "
          >
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]  transition-all duration-200 group-hover:bg-richblack-900 ">
              <p className="">Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-8">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-blue-200 shadow-[10px_-5px_50px_-5px]">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"coding potential"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>
                <html>
                <head>
                <title>Example</title>
                <link rel="stylesheet"href="styles.css">
                <head>
                <body>
                <h1> <a href="/">Header</a> </h1>
                <nav>
                <a href="one/">One</a>
                <a href="two/">Two</a>
                <a href="three/">Three</a>
                </nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={
              "bg-gradient-to-l  from-[#8A2BE2] from[-6.46%] via-[#FFA500] via-[59.04%] to-[#F8F8FF] to-[124.53%]"
            }
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"coding potential"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>
                <html>
                <head> <title>Example</title>
                <link rel="stylesheet"href="styles.css">
                <head>
                <body>
                <h1> <a href="/">Header</a> </h1>
                <nav>
                <a href="one/">One</a>
                <a href="two/">Two</a>
                <a href="three/">Three</a>
                </nav>`}
            codeColor={"text-[#C5C7D4]"}
            backgroundGradient={
              "bg-gradient-to-l  from-[#1FA2FF] from[-3.62%] via-[#12D8FA] via-[50.44%] to-[#A6FFCB] to-[104.51%]"
            }
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore full catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3">Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto">
          <div className="flex flex-row gap-[95px] my-10 ">
            <div className=" text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"job that is in Demand"} />
            </div>
            <div className="flex flex-col gap-10 w-40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>

        <TImeLineSection/>

        <LearningLanguageSection/>
      </div>

      {/* Section 3 */}

      {/* Footer */}
      {/* <div  className="mx-auto flex flex-col max-w-maxContent w-11/12 items-center justify-between text-white">
        <div className=" flex flex-row items-center justify-between">
          <div>
            <div>
              <img src=""></img>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
