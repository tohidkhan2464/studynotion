/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCodes from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);
    try {
      setLoading(true);
      //TODO: const response = await apiConnector({method:"POST", url:contactusEndpoint.CONTACT_US_API, bodyData:data})
      const response = { status: "OK" };
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-10 text-white">
        <div className="flex flex-row gap-5 mobile:flex-col">
          {/* First Name */}
          <div className="flex flex-col w-[50%] mobile:w-11/12 mobile:mx-auto">
            <label
              htmlFor="firstName"
              className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
            >
              First Name
              <sup className=" text-pink-200">*</sup>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter First Name"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className=" font-semibold mt-1 text-red-500">
                Please Enter Your Name
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-[50%] mobile:w-11/12 mobile:mx-auto">
            <label
              htmlFor="lastName"
              className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter Last Name"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
              {...register("lastName")}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col mobile:w-11/12 mobile:mx-auto">
          <label
            htmlFor="email"
            className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Email Address
            <sup className=" text-pink-200">*</sup>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className=" font-semibold mt-1 text-red-500">
              Please enter valid Email Address
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col mobile:w-11/12 mobile:mx-auto">
          <label
            htmlFor="phoneNo"
            className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Phone Number
            <sup className=" text-pink-200">*</sup>
          </label>
          <div className="flex flex-row gap-5 ">
            {/* Drop Down */}
            <select
              name="dropdown"
              id="dropdown"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[20%] mobile:w-[30%] p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
              {...register("countryCode", { required: true })}
            >
              {countryCodes.map((element, index) => {
                return (
                  <option key={index} value={element.dial_code}>
                    {element.dial_code}{" "}
                  </option>
                );
              })}
            </select>

            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              placeholder="12345 67890"
              className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
              {...register("phoneNo", {
                required: { value: true, message: "Please enter Phone Number" },
                maxLength: { value: 10, message: "Invalid Phone Number" },
                minLength: { value: 8, message: "Invalid Phone Number" },
              })}
            />
          </div>
          {errors.phoneNo && (
            <span className=" font-semibold mt-1 text-red-500">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        {/* Message Box */}
        <div className="flex flex-col mobile:w-11/12 mobile:mx-auto">
          <label
            htmlFor="message"
            className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
          >
            Message
            <sup className=" text-pink-200">*</sup>
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="4"
            placeholder="Enter your message"
            className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className=" font-semibold mt-1 text-red-500">
              Please enter a message.
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 hover:scale-95 
          transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-pure-greys-600"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
