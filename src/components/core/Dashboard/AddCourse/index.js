import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <>
      <div className="text-white w-11/12 max-w-maxContent flex mx-auto gap-5 my-5">
        <div className="w-[90%] flex flex-col">
          <h1 className="text-4xl mobile:text-2xl font-medium">Add Course</h1>
          <div className="mt-5 flex w-full flex-col">
            <RenderSteps />
          </div>
        </div>
        <div className="w-[450px] bg-richblack-800 border-[1px] rounded-xl border-richblack-700 flex flex-col p-6  h-fit">
          <p className="text-lg font-semibold">⚡Course Upload Tips</p>

          <ul className="mt-5 flex flex-col gap-y-4 ml-5 list-disc text-[14px]">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important.</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
