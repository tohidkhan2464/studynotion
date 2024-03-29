import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactForm = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full mx-auto mobile:mt-0 mt-16">
      <h1 className="text-white text-4xl mobile:text-2xl text-center font-semibold">
        Get in Touch
      </h1>
      <p className=" text-richblack-300 text-center">
        We’d love to here for you, Please fill out this form.
      </p>
      <div className="border-[2px] border-richblack-700 mobile:w-[90%] w-[60%] rounded-xl mt-10 mobile:p-5 py-8 px-12  ">
        <div className="flex flex-col mobile:p-0 w-full items-center justify-center gap-2 mx-auto my-6 py-8 px-12">
          <div className="w-full">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
