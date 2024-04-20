import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ hadnleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  console.log("Course", course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setConfirmationModal(null);
  };

  return (
    <>
      <div className=" relative overflow-y-hidden  w-full">
        <div className="rounded-lg bg-richblack-700 p-2 px-8">
          {course?.courseContent.map((section) => (
            <details key={section._id} open>
              <summary className="flex items-center justify-between py-1 border-b-2 border-richblack-600 cursor-pointer">
                {/* Section  */}
                <div className="flex items-center gap-x-3 py-1">
                  <RxDropdownMenu className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">
                    {section.sectionName}
                  </p>
                </div>

                <div className="flex items-center gap-x-3">
                  {/*Edit button */}
                  <button
                    onClick={() =>
                      hadnleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                  >
                    <FiEdit2 className="text-xl text-richblack-300" />
                  </button>
                  {/* delete Button */}
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section",
                        text2:
                          "All the lectures in this Section will be deleted",
                        btn1Text: "Delete",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Text: "Cancel",
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                  </button>

                  {/* span and Dropdown*/}
                  <span className="font-medium text-richblack-300">|</span>
                  <BiDownArrow className="text-xl text-richblack-300" />
                </div>
              </summary>

              <div className="px-6 pb-2">
                {/* SubSection */}
                {section?.subSections?.map((subSection) => (
                  <div
                    key={subSection._id}
                    onClick={() => setViewSubSection(subSection)}
                    className="flex items-center justify-between py-2 border-b-2 border-richblack-600 cursor-pointer gap-x-3"
                  >
                    {console.log("subsection", subSection)}
                    {/* DropDown button */}
                    <div className="flex items-center gap-x-3 py-2">
                      <RxDropdownMenu className="text-2xl text-richblack-50" />
                      <p className="font-semibold text-richblack-50">
                        {subSection?.title}
                      </p>
                    </div>

                    {/* Edit and delete Button */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-x-3"
                    >
                      {/*Edit button */}
                      <button
                        onClick={() =>
                          setEditSubSection({
                            ...subSection,
                            sectionId: section._id,
                          })
                        }
                      >
                        <FiEdit2 className="text-xl text-richblack-300" />
                      </button>
                      {/* delete Button */}
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Sub Section",
                            text2:
                              "Selected lectures in this Sub Section will be deleted",
                            btn1Text: "Delete",
                            btn1Handler: () =>
                              handleDeleteSubSection(
                                subSection._id,
                                section._id
                              ),
                            btn2Text: "Cancel",
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line className="text-xl text-richblack-300" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add lecture  */}
                <button
                  className="mt-2 flex items-center gap-x-1 text-yellow-50"
                  onClick={() => setAddSubSection(section._id)}
                >
                  <AiOutlinePlus className="text-lg" />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          ))}
        </div>

        {addSubSection ? (
          <SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />
        ) : viewSubSection ? (
          <SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />
        ) : editSubSection ? (
          <SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        ) : (
          <span></span>
        )}
      </div>
      {confirmationModal && (
        <div className="h-[100vh] z-10 w-screen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <ConfirmationModal modalData={confirmationModal} />
        </div>
      )}
    </>
  );
};

export default NestedView;
