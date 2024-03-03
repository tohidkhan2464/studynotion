const Category = require("../models/Category");
const Course = require("../models/Course");

// create category handler
exports.createCategory = async (req, res) => {
    try {
        // fetch Data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).josn({
            success: false,
            message: err.message,
        });
    }
}

// get all categories
exports.showAllCategories = async (req, res) => {
    try {

        // fetch all categories data
        // console.log("ALl categories")

        const allCategories = await Category.find({}, { name: true, description: true });
        // console.log("ALl categories", allCategories)
        // return all categories in respoonse
        return res.status(200).json({
            success: true,
            message: "All categories returned successfully.",
            data: allCategories,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).josn({
            success: false,
            message: err.message,
        });
    }
};

// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
        // get categoryId
        const { categoryId } = req.body;

        // get corresponding courses of category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        // validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data not found.",
            });
        }

        // get courses for different categories
        const differentCategories = await Category.find({ _id: { $ne: categoryId }, }).populate("courses").exec();

        // get top selling courses
        // // TODO : Do top selling courses on your own
        const topSellingCourses = await Course.aggregate([
            {
                $group: {
                    _id: null, totalEnrolledStudents:
                        { $sum: { $size: "$studentsEnrolled" } }
                }
            },
            { $sort: { totalEnrolledStudents: -1 } }
        ]);


        // return response
        return res.status(200).json({
            success: true,
            message: "Category data fetch successfully.",
            data: {
                selectedCategory, differentCategories, topSellingCourses
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).josn({
            success: false,
            message: err.message,
        });
    }
};