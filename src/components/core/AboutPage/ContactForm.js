import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactForm = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mx-auto mt-16">
      <h1 className="text-white text-4xl text-center font-semibold">
        Get in Touch
      </h1>
      <p className=" text-richblack-300 text-center">
        We’d love to here for you, Please fill out this form.
      </p>
      <div className="mt-10">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
