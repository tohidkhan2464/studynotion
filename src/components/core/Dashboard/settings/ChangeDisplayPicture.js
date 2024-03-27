import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      // console.log("uploading...")
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-9/12">
      <div className="flex flex-col justify-between  mt-16  bg-richblack-800 p-6 rounded-lg border-[1px] border-richblack-700 z-0">
        <div className="flex flex-row mobile:flex-col gap-x-6 w-full items-center ">
          <img
            src={
              previewSource ||
              user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`
            }
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[80px] rounded-full object-cover"
          />
          <div className="flex flex-col mobile:items-center items-start space-y-2">
            <p className="text-xl font-semibold mobile:mt-5">Change Profile Picture</p>
            <div className="flex flex-row gap-x-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              <IconBtn
                onclick={handleClick}
                disabled={loading}
                bgColor={false}
                textColor={false}
                text={"Select"}
                
              ></IconBtn>

              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                bgColor={true}
                customclasess={"flex flex-row gap-2"}
                textColor={true}
                className="cursor-pointer flex flex-row space-x-2 items-center rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
