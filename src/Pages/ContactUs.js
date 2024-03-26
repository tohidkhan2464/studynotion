import React from "react";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import chat from "../assets/ContactUs/chat-bubble-left-right.svg";
import globe from "../assets/ContactUs/globe-europe-africa.svg";
import phone from "../assets/ContactUs/phone.svg";
import Footer from "../components/common/Footer";

const ContactUs = () => {
  return (
    <div className="bg-richblack-900 text-white">
      <div className="py-[50px] pt-[100px] mobile:pt-[70px] w-11/12 max-w-maxContent mx-auto flex mobile:flex-col mobile:items-center mobile:mx-auto flex-row gap-14">
        <div className="w-[450px] mobile:w-[300px] mobile:min-w-[350px] min-w-[450px] bg-richblack-800 h-fit rounded-xl p-6 flex flex-col gap-6">
          
          <div className="flex flex-row items-start  gap-4">
            <div className="p-2">
              <img src={chat} alt="chat icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">Chat on us</p>
              <p className="text-sm font-medium text-richblack-300">
                Our friendly team is here to help.
              </p>
              <p className="text-sm font-medium text-richblack-300">
                tohidkhan1193407@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start  gap-4">
            <div className="p-2">
              <img src={globe} alt="chat icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">Visit us</p>
              <p className="text-sm font-medium text-richblack-300">
                Come and say hello at our office HQ.
              </p>
              <p className="text-sm font-medium text-richblack-300">
                Here is the location/ address
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start  gap-4">
            <div className="p-2">
              <img src={phone} alt="chat icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">Call us</p>
              <p className="text-sm font-medium text-richblack-300">
                Mon - Fri From 8am to 5pm
              </p>
              <p className="text-sm font-medium text-richblack-300">
                +91 123 456 7890
              </p>
            </div>
          </div>
        </div>
        <div className="border-[2px] border-richblack-700 mobile:w-[90%] rounded-xl mobile:p-5 p-10">
          <div className="flex flex-col mobile:p-0 items-center justify-center gap-2 mx-auto my-12 p-5">
            <h1 className="text-white text-4xl mobile:text-2xl text-center font-semibold">
              Got a Idea? We’ve got the skills. Let’s team up
            </h1>
            <p className=" text-richblack-300 text-center">
              Tell us more about yourself and what you’re got in mind.
            </p>
            <div className="mt-10 ">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>

      <div className="py-[50px] w-11/12 max-w-maxContent mx-auto">
        <h1 className="text-4xl mobile:text-2xl text-center font-bold">
          Review from other learners
        </h1>
      </div>

      <div className="pt-[50px]">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
