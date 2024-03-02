// import the required modules
const express = require("express");
const router = express.Router();


// import the controllers
const {
    createCourse, 
    getAllCourses, 
    getCourseDetails
} = require("../controller/Course");


// categories controller import
const {
    createCategory, 
    showAllCategories,
    categoryPageDetails
} = require("../controller/Category");


// import section controllers
const {
    createSection, 
    updateSection,
    deleteSection
} = require("../controller/Section");

// import subsection controllers
const {
    createSubsection, 
    updateSubsection, 
    deleteSubsection
} = require("../controller/SubSection");

// import rating controllers
const {
    createRating, 
    getAverageRating, 
    getAllRating
} = require("../controller/RatingAndReview");

// import middlewares
const {auth, isInstructor, isStudent, isAdmin} = require("../middleware/Auth");

// ****************************************************************************************************************************************************
//                                                                  course routes
// ****************************************************************************************************************************************************

// courses can be created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);
// add a section to the course
router.post("/addSection", auth, isInstructor, createSection);
// update a section
router.post("/updateSection", auth, isInstructor, updateSection);
// delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// edit subsection
router.post("/updateSubSection", auth, isInstructor, updateSubsection);
// delete a subsection
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);
// add a subsection to the section
router.post("/addSubSection", auth, isInstructor, createSubsection);
// get all registered courses
router.get("/getAllCourses", getAllCourses);
// get details for specific courses
router.post("/getCourseDetails", getCourseDetails);

// ****************************************************************************************************************************************************
//                                                      category routes
// ****************************************************************************************************************************************************
// category can be created by admin
// put isAdmin middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ****************************************************************************************************************************************************
//                                                  rating and review routes
// ****************************************************************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;