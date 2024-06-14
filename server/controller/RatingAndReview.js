const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { Mongoose } = require("mongoose");

// createRating
exports.createRating = async (req, res) => {
    try {

        // get userid
        const userId = req.user.id;

        // fetch data from req.body
        const { rating, review, courseId } = req.body;

        // check if user is enrolled or not 
        const courseDetails = await Course.findOne({ _id: courseId, studentsEnrolled: { $elemMatch: { $eq: userId } }, });
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course.",
            });
        }

        // check if user already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId, });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the User.",
            });
        }

        // create rating review and save to DB
        const ratingReview = await RatingAndReview.create({
            rating, review, course: courseId, user: userId,
        });

        // // TODO : Find mistake between line no. 40 to 50
        // update course with this rating
        await Course.findByIdAndUpdate(
            { _id: courseId }, { $push: { ratingAndReviews: ratingReview._id, } }, { new: true }
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully.",
            data: ratingReview
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// getAverageRating
exports.getAverageRating = async (req, res) => {
    try {

        // get course id
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate(
            { $match: { course: new Mongoose.Types.ObjectId(courseId), }, },
            { $group: { _id: null, averageRating: { $avg: "$rating" }, } },
        );

        // return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: `Average rating is ${result[0].averageRating}`,
                averageRating: result[0].averageRating,
            });
        }

        // if no rating exist
        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no rating given till now.",
            averageRating: 0,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// getallRatingandReviews
exports.getAllRating = async (req, res) => {
    try {

        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({ path: "user", select: "firstName lastName email image", })
            .populate({ path: "course", select: "courseName", })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetch successfully.",
            data: allReviews,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.getAllCourseRating = async (req, res) => {
    try {
        // fetch courseId
        const { courseId } = req.body;

        // validation
        if (!courseId) {
            return res.status(300).json({
                success: false,
                message: "Please enter valid course id.",
            });
        }

        // fetch rating
        const result = await RatingAndReview.aggregate(
            { $match: { course: new Mongoose.Types.ObjectId(courseId), }, },
            { $sort: { rating: "desc" }, },
        );

        // validation
        if (!result) {
            return res.status(200).json({
                success: true,
                message: "No user added their reviews for this course",
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Data fetched successfully.",
            data: result,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};