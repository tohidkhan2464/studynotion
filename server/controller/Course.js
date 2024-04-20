/* eslint-disable no-dupe-keys */
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const RatingAndReview = require("../models/RatingAndReview");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// createCourse handler
exports.createCourse = async (req, res) => {
  try {
    // fetch the data
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    // console.log("req body", req.body);
    // get thumbnail
    const thumbnail = req.files.thumbnail;

    // validation
    // console.log("courseName -> ", courseName);
    // console.log("courseDescription -> ", courseDescription);
    // console.log("whatYouWillLearn -> ", whatYouWillLearn);
    // console.log("price -> ", price);
    // console.log("category -> ", category);
    // console.log("thumbnail -> ", thumbnail);
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All the fields are mandatory.",
      });
    }

    // check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    console.log("Instructor Details - ", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // check if category is valid or not
    const tagDetails = await Category.findById(category);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found",
      });
    }

    // upload to cloudinary
    const thumbnailsImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: tagDetails._id,
      thumbnail: thumbnailsImage.secure_url,
      section: null,
    });

    // update the user(instructor)
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create the Course.",
      error: err.message,
    });
  }
};

// getAllCourses handler
exports.getAllCourses = async (req, res) => {
  try {
    const allcourses = await Course.find(
      { status: "Published" },
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data fetch successfully",
      data: allcourses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Can't get the all courses.",
      error: err.message,
    });
  }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    // get id
    const { courseId } = req.body;

    // find courseDetails
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .populate("category")
      .exec();

    // validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully.",
      data: courseDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: "Courld not found the course",
      });
    }

    if (req.files) {
      const thumbnail = req.files.thumbnail;
      const thumbnailsImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailsImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }
    await course.save();

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .populate("category")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: courseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create the Course.",
      error: err.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // get id
    const userId = req.user.id;

    // find courseDetails
    const courseDetails = await Course.find({ instructor: userId }).sort({
      createdAt: -1,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Courses  fetched successfully.",
      data: courseDetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.find({ _id: courseId });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    await RatingAndReview.deleteMany({
      _id: { $in: courseDetails.ratingAndReviews },
    });

    const sectionDetails = await Section.find({
      _id: { $in: courseDetails.courseContent },
    });

    await SubSection.deleteMany({
      _id: { $in: sectionDetails.subSections },
    });

    await Section.deleteMany({
      _id: { $in: courseDetails.courseContent },
    });

    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { courses: courseId } },
      { new: true }
    );

    await Course.findByIdAndDelete({ _id: courseId });

    return res.status(200).json({
      success: true,
      message: "Course Deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to delete profile.",
      error: err.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    // get id
    const { courseId } = req.body;
    const userId = req.user.id;

    // find courseDetails
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .populate("ratingAndReviews")
      .populate("category")
      .exec();

    let courseProgrssCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    // validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with ID ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    // return response
    return res.status(200).json({
      success: true,
      message: "Full Course Details fetched successfully.",
      data: {
        courseDetails,
        totalDuration,
        completed: courseProgrssCount?.completedVideos
          ? courseProgrssCount?.completedVideos
          : [],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
