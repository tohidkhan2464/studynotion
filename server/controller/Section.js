const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        status: false,
        message: "Missing Properties",
      });
    }

    // create section
    const newSection = await Section.create({
      sectionName: sectionName,
    });


    // update course with section ID
    const updateCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate("courseContent")
      .exec();

      // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully.",
      data: updateCourseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to create section.",
      error: err.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId, courseId } = req.body;

    // data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        status: false,
        message: "Missing Properties",
      });
    }

    // update data
    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully.",
      data: course,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to update the section.",
      error: err.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    // use findByIdAndDelete
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate("courseContent")
      .exec();

    const sectionDetils = await Section.findByIdAndDelete({ _id: sectionId });

    await SubSection.deleteMany({ _id: { $in: sectionDetils.subSections } });

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully.",
      data: updatedCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete the section.",
      error: err.message,
    });
  }
};
