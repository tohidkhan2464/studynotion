const Section = require("../models/Section");
const Course = require("../models/Course");

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
        console.log("sectionName ->", sectionName);
        // create section
        const newSection = await Section.create(
            {
                sectionName: sectionName,
                
            }
        );

        console.log("newSection ->", newSection);

        // update course with section ID
        const updateCourseDetails = await Course.findByIdAndUpdate(
            courseId, { $push: { courseContent: newSection._id, } },
            { new: true },
        ).populate("courseContent").exec();
        // // TODO : Populate section and subsection in the updated course
        console.log("updateCourseDetails ->", updateCourseDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully.",
            updateCourseDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to create section.",
            error: err.message,
        });
    }
}

exports.updateSection = async (req, res) => {
    try {

        // fetch data
        const { sectionName, sectionId } = req.body;

        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                status: false,
                message: "Missing Properties",
            });
        }

        // update data
        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true },);

        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully.",
            section,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to update the section.",
            error: err.message,
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        // fetch section ID - assuming that we are sending the id in params
        // const {sectionId} = req.body;
        const { sectionId } = req.body;

        // use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully.",
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to delete the section.",
            error: err.message,
        });
    }
}