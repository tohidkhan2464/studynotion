const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// update the additional details in the profile
exports.updateProfile = async (req, res) => {
    try {

        // fetch data
        const { firstName="", lastName="", dateOfBirth = "", about = "", contactNumber, gender } = req.body;

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
        if(firstName || lastName){

            userDetails.firstName = firstName;
            userDetails.lasttName = lastName;
            await userDetails.save();
        }

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        profileDetails.about = about;
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            profileDetails,
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

        // fetch id
        const id = req.user.id;
        console.log("id ->", id)
        // validate
        const userDetails = await User.findById(id);
        console.log("userDetails ->", userDetails);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // // TODO : HW unenrolled user from all enrolled courses

        await Course.findOneAndDelete({ studentsEnrolled: id });

        // delete user
        await User.findByIdAndDelete({ _id: id });


        // return response
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
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

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
        console.log("UserId -> ", userId);
        console.log("Type of userId -> ", typeof (userId));
        const profilePicture = req.files.profilePicture;

        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = profilePicture.name.split(".")[1].toLowerCase();

        if (supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File type not Supperted",
            });
        }

        const response = await uploadImageToCloudinary(profilePicture, "StudyNotion");
        console.log("response -> ", response);
        const userDetails = await User.findByIdAndUpdate(userId);
        userDetails.image = response.secure_url;
        await userDetails.save();
        console.log("User Details -> ", userDetails);

        return res.json({
            success: true,
            image_url: response.secure_url,
            message: "Image Uploaded successfully",
            userDetails,
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

        if(!userDetails){
            return res.status(300).json({
                success:false,
                message:"Wrong user Id",
            });
        }

        const courses = userDetails.courses;
        console.log("courses ->", courses);
        
        return res.status(200).json({
            success: true,
            message: "Image Uploaded successfully",
            courses,
        });
        
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}