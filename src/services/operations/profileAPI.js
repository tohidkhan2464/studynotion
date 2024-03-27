import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
import { logout } from "./authAPI";

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } =
  profileEndpoints;

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_USER_ENROLLED_COURSES_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("GET USER ENROLLED COURSES API RESPONSE .... ", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.courses;
  } catch (error) {
    console.log("GET USER ENROLLED COURSES API ERROE .... ", error);
    toast.error("Could not get Enrolled Courses.");
  }
  toast.dismiss(toastId);
  return result;
}
