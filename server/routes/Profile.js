const express = require("express");
const router = express.Router();
const { auth, isInstructor, isAdmin } = require("../middleware/Auth");
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  getUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controller/Profile");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.get("/getUserDetails", auth, getUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/allUserData", auth, getAllUserDetails);
router.get("/userProfile", auth, isInstructor, getUserDetails);
// router.get("/deleteAccountByAdmin", auth, isAdmin, deleteAccountByAdmin);
// router.get("/instructorDashboard", auth,isInstructor, getInstructorDashboard);

// router.post("/createSocial", auth createSocial)
// router.put("/updateSocial", auth, updateSocial);
// router.delete("/deleteSocial", auth, deleteSocial);

module.exports = router;
