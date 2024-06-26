const express = require("express");
const router = express.Router();

//Route for :- createCourse , Section(add, update, delete) , Subsection(add, update, delete), getAllCourses, getCoursesDetails;
//Route for :- createCategory , showAllCategories , getCategoryPageDetails
//Route for :-  createRating , getAverageRating , getReviews
//Route for :- updateCourseProgress

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controller/Course"); // Course Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controller/Category"); // Categories Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/Section"); // Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controller/SubSection"); // Sub-Sections Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controller/RatingAndReview"); // Rating Controllers Import
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middleware/Auth"); // Importing Middlewares
const { updateCourseProgress } = require("../controller/courseProgress");

// ********************************************************************************************************
//                                      Course routes (only by Instructors)                               *
// ********************************************************************************************************
router.post("/createCourse", auth, isInstructor, createCourse); // Courses can Only be Created by Instructors
router.post("/addSection", auth, isInstructor, createSection); //Add a Section to a Course
router.post("/updateSection", auth, isInstructor, updateSection); // Update a Section
router.post("/deleteSection", auth, isInstructor, deleteSection); // Delete a Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection); // Edit Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.get("/getAllCourses", getAllCourses); // Get all Registered Courses
router.post("/getCourseDetails", getCourseDetails); // Get Details for a Specific Courses

router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse); // Edit Course routes
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses); // Get all Courses Under a Specific Instructor
router.delete("/deleteCourse", deleteCourse); // Delete a Course
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)                                   *
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review (only by Student)                               *
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   createCourse,
//   getAllCourses,
//   getCourseDetails,
//   editCourse,
//   deleteCourse,
//   getInstructorCourses,
//   getFullCourseDetails,
// } = require("../controller/Course");
// const {
//   createCategory,
//   showAllCategories,
//   categoryPageDetails,
//   deleteCategory,
//   updateCategory,
// } = require("../controller/Category");
// const {
//   createSection,
//   updateSection,
//   deleteSection,
// } = require("../controller/Section");
// const {
//   createSubsection,
//   updateSubsection,
//   deleteSubsection,
// } = require("../controller/SubSection");
// const {
//   createRating,
//   getAverageRating,
//   getAllRating,
// } = require("../controller/RatingAndReview");
// const {
//   auth,
//   isInstructor,
//   isStudent,
//   isAdmin,
// } = require("../middleware/Auth");

// router.get("/getAllCourses", getAllCourses);
// router.post("/getCourseDetails", getCourseDetails);
// router.post("/editCourse", auth, isInstructor, editCourse);
// router.get("/showAllCategories", showAllCategories);
// router.post("/createCourse", auth, isInstructor, createCourse);
// router.post("/addSection", auth, isInstructor, createSection);
// router.post("/addSubSection", auth, isInstructor, createSubsection);
// router.post("/updateSection", auth, isInstructor, updateSection);
// router.post("/updateSubSection", auth, isInstructor, updateSubsection);
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// router.put("/deleteSection", auth, isInstructor, deleteSection);
// router.put("/deleteSubSection", auth, isInstructor, deleteSubsection);
// router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
// router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// // router.post("/updateCourseProgress", auth, updateCourseProgress);
// router.post("/createRating", auth, isStudent, createRating);

// router.get("/getReviews", getAllRating);

// router.get("/showAllCategories", showAllCategories);
// router.post("/createCategory", auth, isAdmin, createCategory);
// router.delete("/deleteCategory", auth, isAdmin, deleteCategory);
// router.put("/updateCategory", auth, isAdmin, updateCategory);

// router.post("/getCategoryPageDetails", categoryPageDetails);

// router.get("/getAverageRating", getAverageRating);

// module.exports = router;
