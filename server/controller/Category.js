/* eslint-disable no-dupe-keys */
const Category = require("../models/Category");
const Course = require("../models/Course");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
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
      });
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
      categoryDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).josn({
      success: false,
      message: err.message,
    });
  }
};

// get all categories
exports.showAllCategories = async (req, res) => {
  try {
    // fetch all categories data
    const allCategories = await Category.find({});
    // return all categories in respoonse
    return res.status(200).json({
      success: true,
      message: "All categories returned successfully.",
      data: allCategories,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
      })
      .exec();
    // Handle the case when the category is not found
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
      })
      .exec();

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: { selectedCategory, differentCategory, mostSellingCourses },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    // get categoryId
    const { categoryId } = req.body;

    // get corresponding courses of category
    const selectedCategory = await Category.findById(categoryId);

    // validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    await Course.findByIdAndDelete(
      { category: categoryId },
      { $pullAll: { category: { $in: selectedCategory } } }
    );

    await Category.findOneAndDelete({ _id: categoryId });
    // return response
    return res.status(200).json({
      success: true,
      message: "Category data deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).josn({
      success: false,
      message: err.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    // fetch Data
    const { categoryId, name = "", description = "" } = req.body;

    // validation
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Category.",
      });
    }

    // create entry in DB
    const categoryDetails = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { name: name, description: description },
      { new: true }
    );


    // return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      categoryDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).josn({
      success: false,
      message: err.message,
    });
  }
};
