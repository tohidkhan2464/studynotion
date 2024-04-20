/* eslint-disable no-dupe-keys */
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// update the additional details in the profile
exports.updateProfile = async (req, res) => {
  try {
    // fetch data
    console.log("Request body ", req.body);
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

    // validation
    // if (!contactNumber || !gender || !id) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "All fields are required.",
    //     });
    // }

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
    // console.log("UserId -> ", userId);
    // console.log("Type of userId -> ", typeof (userId));
    // console.log("Request ", req)
    const profilePicture = req.files.displayPicture;
    // console.log("Profile", profilePicture)
    // console.log("Profile type", profilePicture.name)

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = profilePicture.name.split(".")[-1];

    if (supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not Supperted",
      });
    }
    // console.log("Type of profile picture -> ", typeof (profilePicture));

    // console.log("Profile picture", profilePicture);

    const response = await uploadImageToCloudinary(
      profilePicture,
      "StudyNotion"
    );
    // console.log("response -> ", response);
    const userDetails = await User.findByIdAndUpdate(userId);
    userDetails.image = response.secure_url;
    await userDetails.save();
    // console.log("User Details -> ", userDetails);
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
    console.log("courses ->", courses);
    const courseDetails = await Course.find({ _id: { $in: courses } })
      .populate({ path: "courseContent", populate: { path: "subSections" } })
      .populate({ path: "ratingAndReviews" })
      .exec();
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    // console.log("courseDetails ->", courseDetails);
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses: courseDetails,
      duration: totalDuration,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
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
