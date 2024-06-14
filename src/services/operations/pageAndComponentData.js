import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../api";

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector({
      method: "POST",
      url: catalogData.CATALOGPAGEDATA_API,
      bodyData: categoryId,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch Category data");
    }
    result = response?.data;
  } catch (error) {
    toast.error(error.message);
    // result = result.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
