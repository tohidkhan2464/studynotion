import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../api";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// export function signUp(
//     firstName, lastName, email, password, confirmPassword, contactNumber, accountType, otp, navigate
//   ) {
//     return async (dispatch) => {
//       const toastId = toast.loading("Loading...");
//       dispatch(setLoading(true));
//       try {
//         const response = await apiConnector({
//           method: "POST",
//           url: SIGNUP_API,
//           bodyData: {
//             firstName, lastName, email, password, confirmPassword, contactNumber, accountType, otp,
//           },
//         });
//         console.log("SIGNUP API RESPONSE............", response);
//         if (!response.data.success) {
//           throw new Error(response.data.message);
//         }
//         toast.success("Signup Successful");
//         navigate("/login");
//       } catch (error) {
//         console.log("SIGNUP API ERROR............", error);
//         toast.error(error?.response?.data?.message || "Failed");
//         navigate("/signup");
//       }
//       dispatch(setLoading(false));
//       toast.dismiss(toastId);
//     };
//   }

export function updateProfile(
  firstName,
  lastName,
  email,
  dateOfBirth,
  contactNumber,
  gender,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: "PUT",
        url: UPDATE_PROFILE_API,
        bodyData: {
          firstName,
          lastName,
          email,
          dateOfBirth,
          contactNumber,
          gender,
        },
      });
      console.log("Profile Update API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Update Successful");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error?.response?.data?.message || "Failed");
    //   navigate("/dashboard/my-profile");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
