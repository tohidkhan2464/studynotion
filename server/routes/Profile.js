const express = require("express");
const router = express.Router();
const { auth} = require("../middleware/Auth");
const { 
    updateProfile, 
    deleteAccount, 
    getAllUserDetails, 
    updateDisplayPicture, 
    getEnrolledCourses } = require("../controller/Profile");

// delete user account
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// get ernrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;