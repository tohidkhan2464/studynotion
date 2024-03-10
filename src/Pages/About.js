import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import image1 from "../assets/About/Frame 37.png";
import image2 from "../assets/About/Frame 46.png";
import image3 from "../assets/About/Frame 47.png";
import image from "../assets/About/HTML_source_code_example 1.png";
import Quote from "../components/core/AboutPage/Quote";
import StatesComponent from "../components/core/AboutPage/StatesComponent";
import LearningGrid from "../components/core/AboutPage/learningGrid";
import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className=" ">
      {/* Section 1 */}
      <div className="bg-richblack-800 text-white">
        <section className="pt-[100px] w-11/12 max-w-maxContent mx-auto">
          <div className="relative pb-64">
            <header className="flex flex-col items-center justify-center max-w-[800px] mx-auto text-center">
              <h1 className=" text-4xl font-semibold flex flex-col items-center justify-center">
                Driving Innovation in Online Education for a
                <HighlightText text={"Brighter Future"} />
              </h1>
              <p className=" text-base text-richblack-300 font-medium my-4">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </header>
            <div className="flex flex-row mx-auto items-center justify-center gap-6 absolute mt-4">
              <img src={image1} alt="about us 1" />
              <img src={image2} alt="about us 2" />
              <img src={image3} alt="about us 3" />
            </div>
          </div>
        </section>
      </div>

      {/* section 2 */}
      <div className="bg-richblack-900 text-white mt-48 pb-20 border-b-[2px] border-richblack-700">
        <section className="text-center font-semibold w-11/12 max-w-maxContent mx-auto">
          <div className="w-[95%] mx-auto ">
            <Quote />
          </div>
        </section>
      </div>

      {/* section 3 */}
      <div className="bg-richblack-900 text-white mt-20 ">
        <section className=" font-semibold w-11/12 max-w-maxContent mx-auto">
          <div className="flex flex-col gap-20">
            <div className="flex flex-row gap-10 justify-between items-center">
              <div className="w-[45%] flex flex-col gap-6 font-normal text-richblack-300">
                <h1 className="text-4xl font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                  Our Founding Story
                </h1>
                <p>
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>
                <p>
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>

              <div className="w-[45%]">
                <img src={image} alt="about us founding story" />
              </div>
            </div>

            <div className="flex flex-row gap-10 justify-between items-center">
              <div className="w-[45%] flex flex-col gap-6 font-normal text-richblack-300">
                <h1 className="text-4xl font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00] to-[#F9D423]">
                  Our Vision
                </h1>
                <p>
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>
              <div className="w-[45%] flex flex-col gap-6 font-normal text-richblack-300">
                <h1 className="text-4xl font-bold text-richblue-200 text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
                  Our Mission
                </h1>
                <p>
                  our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* section 4 */}
      <div className="bg-richblack-800 text-white mt-20 border-b-[2px] border-richblack-700 ">
        <StatesComponent />
      </div>

      {/* section 5 */}
      <div className="bg-richblack-900 text-white mt-20">
        <section className="flex flex-col gap-10 mx-auto items-center justify-between pt-[100px] w-11/12 max-w-maxContent">
          <LearningGrid />
          <ContactForm />
        </section>
      </div>

      {/* Review Slider */}
      <div className="bg-richblack-900 text-white mt-20">
        <section className="text-center mx-auto w-11/12 max-w-maxContent">
          <div>
            <h1 className="text-4xl text-white">Reveiws from other Learners</h1>
            {/* <ReviewSlider/> */}
          </div>
        </section>
      </div>

      {/* Footer section */}
      <section className="mt-20">
        <Footer />
      </section>
    </div>
  );
};

export default About;
