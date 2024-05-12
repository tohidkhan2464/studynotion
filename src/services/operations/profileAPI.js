import { toast } from "react-hot-toast";
// import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";
// import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

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

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // console.log("response", response);

    result = response?.data?.data;
    // console.log("result", result)
  } catch (error) {
    toast.error("Could not get Enrolled Courses.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getUserCourses(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_USER_DETAILS_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.courses;
  } catch (error) {
    toast.error("Could not get Enrolled Courses.");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "GET",
      url: GET_INSTRUCTOR_DATA_API,
      bodyData: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log("GET_INSTRUCTOR_DATA_API response", response);
    result = response.data.courses;
  } catch (error) {
    toast.error("Could not get Enrolled Courses.");
    // console.log("GET_INSTRUCTOR_DATA_API ERROR", error);
  }
  toast.dismiss(toastId);
  return result;
}
