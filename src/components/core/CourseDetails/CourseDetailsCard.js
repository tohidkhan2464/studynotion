import React from "react";
import IconBtn from "../../common/IconBtn";
import { PiCaretCircleDoubleRightFill, PiShareFatBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   console.log("Course user", user);

  const handleAddToCart = () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Intructor, You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add To Cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className=" bg-richblack-700 rounded-xl">
      <img
        src={course?.thumbnail}
        className="rounded-t-xl"
        alt={`Thumbnail of ${course?.courseName}`}
      />

      <div className="p-4">
        <div>
          <p className="text-3xl font-bold">Rs. {course?.price}</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-y-2 mt-2">
          {(!user || !course?.studentsEnrolled?.includes(user?._id)) && (
            <IconBtn
              text={"Add to Cart"}
              textColor={true}
              onclick={handleAddToCart}
              customclasess={"w-full"}
              bgColor={true}
            ></IconBtn>
          )}
          <button
            onClick={
              user && course?.studentsEnrolled?.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse()
            }
            className="bg-richblack-800 mt-2 rounded-[8px]  py-[10px] px-[24px] cursor-pointer items-center 
             drop-shadow-[2px_2px_0px_#424854] transition-all duration-200 hover:-translate-y-1 w-full hover:text-yellow-50"
          >
            {user && course?.studentsEnrolled?.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
        </div>

        <p className="text-center text-base text-richblack-300 w-full mt-4 mx-auto">
          30-Day Money-Back Guarantee
        </p>
        <div className="mt-4">
          <p>This course includes:</p>
          <div className="flex flex-col gap-1 mt-2 text-sm text-caribeangreen-100">
            {course?.instructions?.map((item, i) => (
              <p className={`flex items-center gap-1 ml-2`} key={i}>
                <PiCaretCircleDoubleRightFill />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            className="mx-auto flex gap-2 text-yellow-100 bg-richblack-800 mt-2 rounded-[8px]  
            py-[10px] px-[24px] cursor-pointer items-center justify-center drop-shadow-[2px_2px_0px_#424854] 
            transition-all duration-200 hover:-translate-y-1 w-full hover:text-richblack-5 "
            onClick={handleShare}
          >
            <PiShareFatBold size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
