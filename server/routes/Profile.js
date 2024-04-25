const express = require("express");
const router = express.Router();

// Routes for deleteprofile , updateprofile ,getuserdetails , getEnrolledCourse , updateDisplayPicture;

const { auth, isInstructor } = require("../middleware/Auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controller/Profile");

// ********************************************************************************************************
//                                      Profile routes                                                    *
// ********************************************************************************************************
router.delete("/deleteProfile", auth, deleteAccount); // Delet User Account
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses); // Get Enrolled Courses
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { auth, isInstructor, isAdmin } = require("../middleware/Auth");
// const {
//   updateProfile,
//   deleteAccount,
//   getAllUserDetails,
//   getUserDetails,
//   updateDisplayPicture,
//   getEnrolledCourses,
//   deleteAccountByAdmin,
// } = require("../controller/Profile");

// router.delete("/deleteProfile", auth, deleteAccount);
// router.put("/updateProfile", auth, updateProfile);
// router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// router.get("/getUserDetails", auth, getUserDetails);
// router.get("/getEnrolledCourses", auth, getEnrolledCourses);
// router.get("/allUserData", auth, getAllUserDetails);
// router.get("/userProfile", auth, isInstructor, getUserDetails);
// router.get("/deleteAccountByAdmin", auth, isAdmin, deleteAccountByAdmin);
// // router.get("/instructorDashboard", auth,isInstructor, getInstructorDashboard);

// // router.post("/createSocial", auth createSocial)
// // router.put("/updateSocial", auth, updateSocial);
// // router.delete("/deleteSocial", auth, deleteSocial);

// module.exports = router;
