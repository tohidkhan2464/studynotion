import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import banner from "../assets/Home_items/video.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TImeLineSection from "../components/core/HomePage/TImeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import useWindowDimensions from "../hooks/getWindowSize";

const Home = () => {
  const { height, width } = useWindowDimensions();
  return (
    // TODO: MAtch the syling with original page
    <div className=" mobile:w-full">
      <div className="text-white">
        width: {width} ~ height: {height}
      </div>
      {/* Section 1 */}
      <div className=" relative mx-auto flex flex-col max-w-maxContent w-11/12  items-center justify-between text-white">
        <Link to={"/signup"}>
          <div
            className="mx-auto group rounded-full bg-richblack-800 transition-all duration-500 hover:scale-95 w-fit
          mt-16 p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
          "
          >
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]  transition-all duration-500 group-hover:bg-richblack-900 ">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl mobile:text-2xl font-semibold mt-8">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className=" w-[90%] text-center text-lg mobile:text-sm font-bold text-richblack-300 mt-4">
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

        <div className="mx-3 my-7 mobile:max-w-[350px] largeMobile:max-w-[650px] ">
          <div className=" relative z-20">
            <div className=" absolute top-5 left-0 -z-[2] blur-3xl h-[300px] w-[992px]
             mobile:w-[300px] mobile:h-[150px] largeMobile:w-[450px] largeMobile:h-[200px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]"></div>

            <div>
              <video
                muted
                loop
                autoPlay
                className="shadow-[20px_20px_rgba(255,255,255)]"
              >
                <source src={banner} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Code Section 1 */}
        <div className="mx-auto flex items-center justify-center">
          <CodeBlocks
            position={`flex-row mobile:flex-col largeMobile:flex-col`}
            heading={
              <div className="text-4xl mobile:text-2xl largeMobile:text-2xl font-semibold">
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
                <link rel="stylesheet" 
                href="styles.css"> </head>
                <body>
                <h1> <a href="/">Header</a> </h1>
                <nav> <a href="one/">One</a> 
                <a href="two/">Two</a>
                <a href="three/">Three</a>
                </nav> 
                </body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={
              "bg-gradient-to-l  from-[#8A2BE2] from[-6.46%] via-[#FFA500] via-[59.04%] to-[#F8F8FF] to-[124.53%]"
            }
          />
        </div>

        {/* Code Section 2 */}
        <div className="mx-auto flex items-center justify-center">
          <CodeBlocks
            position={"flex-row-reverse mobile:flex-col largeMobile:flex-col "}
            heading={
              <div className="text-4xl mobile:text-2xl largeMobile:text-2xl font-semibold">
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
            codeBlock={`import React from "react";
            import CTAButton from "./Button";
            import TypeAnimation from "react-type";
            const Home = () => {
            return (
            <div>
            Home
            </div>
            )
            }

            export default Home;`}
            codeColor={"text-[#C5C7D4]"}
            backgroundGradient={
              "bg-gradient-to-l  from-[#1FA2FF] from[-3.62%] via-[#12D8FA] via-[50.44%] to-[#A6FFCB] to-[104.51%]"
            }
          />
        </div>

        <ExploreMore />
      </div>
      
      {/* Section 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700 mt-10">
        <div className="homepage_bg h-[333px] mobile:h-[300px] largeMobile:h-[300px]">
          <div className="w-11/12  max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
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

        <div className="w-11/12  max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto">
          <div className="flex flex-row mobile:flex-col mobile:gap-5 largeMobile:flex-col largeMobile:gap-5 gap-[95px] my-10 ">
            <div className=" text-4xl mobile:text-2xl largeMobile:text-2xl font-semibold w-[45%] largeMobile:w-full mobile:w-full">
              Get the Skills you need for a
              <HighlightText text={"job that is in Demand"} />
            </div>
            <div className="flex flex-col gap-10 mobile:w-full largeMobile:w-full largeMobile:items-center mobile:items-center w-[40%] items-start">
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

          <TImeLineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white first-letter">
        <InstructorSection />

        <h2 className="text-center text-4xl mobile:text-2xl font-semibold mt-10">
          Review from other Learners
        </h2>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
