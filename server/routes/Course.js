const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controller/Course");
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controller/Category");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/Section");
const {
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controller/SubSection");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controller/RatingAndReview");
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middleware/Auth");

router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
// router.put("/editCourse", editCourse);
router.get("/showAllCategories", showAllCategories);
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/addSubSection", auth, isInstructor, createSubsection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/updateSubSection", auth, isInstructor, updateSubsection);
// router.get("/getInstructorCourses", getInstructorCourses);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);
// router.post("/deleteCourse", auth, isInstructor, deleteCourse);
// router.get("/getFullCourseDetails", getFullCourseDetails);
// router.post("/updateCourseProgress", auth, updateCourseProgress);
router.post("/createRating", auth, isStudent, createRating);

router.get("/getReviews", getAllRating);

router.get("/showAllCategories", showAllCategories);
router.post("/createCategory", auth, isAdmin, createCategory);
// router.delete("/deleteCategory", auth, isAdmin, deleteCategory);
// router.put("/updateCategory", auth, isAdmin, updateCategory);

router.post("/getCategoryPageDetails", categoryPageDetails);

router.get("/getAverageRating", getAverageRating);

module.exports = router;
