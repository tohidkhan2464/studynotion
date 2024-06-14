/* eslint-disable no-dupe-keys */
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// update the additional details in the profile
exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    const {
      firstName,
      lastName,
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body.firstName;

    // get userId
    const id = req.user.id;


    // find profile
    const userDetails = await User.findById(id);

    userDetails.firstName = firstName;
    userDetails.lastName = lastName;
    await userDetails.save();

    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    await profileDetails.save();

    const updatedUserDetails = await User.findById(id).populate(
      "additionalDetails"
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      updatedUserDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
      error: err.message,
    });
  }
};

// delete account
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    await Course.findOneAndDelete({ studentsEnrolled: id });

    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "User Deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete profile.",
      error: err.message,
    });
  }
};

// get all details of user
exports.getAllUserDetails = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    // get user details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .populate({
        path: "courses",
        populate: { path: "courseContent", populate: { path: "subSections" } },
        populate: { path: "instructor" },
        populate: { path: "ratingAndReviews" },
        populate: { path: "studentsEnrolled" },
      })
      .populate({
        path: "courseProgress",
        populate: { path: "completedVideos" },
      })
      .exec();

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched User details successfully.",
      userDetails,
      courses: userDetails.courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get user Details.",
      error: err.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    // get user details
    const userDetails = await User.findById(id);

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Fetched User details successfully.",
      userDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to get user Details.",
      error: err.message,
    });
  }
};

// update the profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const profilePicture = req.files.displayPicture;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = profilePicture.name.split(".")[-1];

    if (supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }

    const response = await uploadImageToCloudinary(
      profilePicture,
      "StudyNotion"
    );

    const userDetails = await User.findByIdAndUpdate(userId);
    userDetails.image = response.secure_url;
    await userDetails.save();

    const updatedUserDetails = await User.findById(userId).populate(
      "additionalDetails"
    );
    return res.json({
      success: true,
      image_url: response.secure_url,
      message: "Image Uploaded successfully",
      updatedUserDetails: updatedUserDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    // get userid
    const userId = req.user.id;

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(300).json({
        success: false,
        message: "Wrong user Id",
      });
    }

    const courses = userDetails.courses;

    let data = [];

    for (const course_id of courses) {
      const courseDetails = await Course.findById(course_id)
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSections",
          },
        })
        .exec();
      let courseProgressCount = await CourseProgress.findOne({
        courseID: course_id,
        userId: userId,
      });

      let totalDurationInSeconds = 0;
      courseDetails?.courseContent?.forEach((content) => {
        content?.subSections?.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration);
          totalDurationInSeconds += timeDurationInSeconds;
        });
      });
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
      const courseProg = courseProgressCount?.completedVideos.length;

      let totalVideos = 0;
      courseDetails?.courseContent?.forEach((content) => {
        content?.subSections?.forEach((subSection) => {
          if (subSection.videoUrl !== null) {
            totalVideos += 1;
          }
        });
      });

      data.push({
        courseDetails,
        totalDuration,
        courseProgress: (courseProg / totalVideos) * 100,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
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

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAccountByAdmin = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    await Course.findOneAndDelete({ studentsEnrolled: id });

    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "User Deleted successfully by Admin.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete profile.",
      error: err.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course?.studentsEnrolled?.length;
      const totalAmountGenerated = totalStudentsEnrolled * course?.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });
    res.status(200).json({
      success: true,
      courses: courseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
