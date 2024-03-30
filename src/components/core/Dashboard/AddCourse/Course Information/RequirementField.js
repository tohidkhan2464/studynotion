/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };
  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="text-base text-richblack-5 mb-1 leading-[1.375rem]"
      >
        {label}
        <sup className=" text-pink-200">*</sup>{" "}
      </label>
      <div>
        <input
          type="text"
          id={name}
          placeholder="Enter the Requirements or Instructions"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className=" bg-richblack-700 mt-2 rounded-[0.5rem] text-richblack-5 w-full p-[12px] drop-shadow-[0px_2px_0px_rgba(255,255,255,0.18)]"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-lg mt-2 text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span> {requirement} </span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-base mx-2 text-pure-greys-400 underline"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className=" text-red-500 mt-1">{label} is required</span>
      )}
    </div>
  );
};

export default RequirementField;
