/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="text-white w-11/12 desktop:w-9/12 max-w-maxContent flex flex-col gap-5 mx-auto my-12">
      <div className=" flex flex-col">
        <div className="mx-auto max-w-[700px]">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            {" "}
            Edit Course{" "}
          </h1>
        </div>
        <div className="mx-auto w-8/12">
          {course ? (
            <RenderSteps />
          ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
              {" "}
              Course not found{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
