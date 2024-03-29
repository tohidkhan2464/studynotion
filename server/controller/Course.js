const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// createCourse handler
exports.createCourse = async (req, res) => {
    try {

        // fetch the data
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

        // get thumbnail
        const thumbnail  = req.files.thumbnail;

        // validation
        // console.log("courseName -> ", courseName);
        // console.log("courseDescription -> ", courseDescription);
        // console.log("whatYouWillLearn -> ", whatYouWillLearn);
        // console.log("price -> ", price);
        // console.log("category -> ", category);
        // console.log("thumbnail -> ", thumbnail);
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All the fields are mandatory.",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details - ", instructorDetails);

        // // TODO : verify that is userId and instructorDetails._id are same or not.

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
        const thumbnailsImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: tagDetails._id,
            thumbnail: thumbnailsImage.secure_url,
            section:null,
        });

        // update the user(instructor)
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true },
        );

        // // TODO: HW update the category schema

        await Category.findByIdAndUpdate(
            { _id: tagDetails._id },
            {
                $push: {
                    course: newCourse._id,
                }
            },
            { new: true },
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
}

// getAllCourses handler
exports.getAllCourses = async (req, res) => {
    try {

        const allcourses = await Course.find({}, {
            courseName: true, price: true, thumbnail: true, instructor: true,
            ratingAndReviews: true, studentsEnrolled: true,
        }).populate("instructor").exec();

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
        })
    }
};

// getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {

        // get id
        const { courseId } = req.body;

        // find courseDetails
        const courseDetails = await Course.find({ _id: courseId },)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
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
}
