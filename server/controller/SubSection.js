const { Mongoose } = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");
require("dotenv").config();

// create subsection
exports.createSubSection = async (req, res) => {
  try {
    // console.log("req body", req.body.formData);

    // fetch data from req.body
    const { sectionId, title, description } = req.body;
    // extract file/video
    // const video = videoUrl;
    // console.log("sectionId", sectionId);
    // console.log("title", title);
    // console.log("timeDuration", timeDuration);
    // console.log("description", description);
    const video = req.files.video;
    // console.log("videoUrl", video);

    // validation
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // console.log("upload respone -> ", uploadDetails);
    // create the subsection
    const subsectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // update the subsection id to the section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSections: subsectionDetails._id } },
      { new: true }
    )
      .populate("subSections")
      .exec();

    // // TODO :  log updated section here, after adding populate query

    // return response
    return res.status(200).json({
      success: true,
      message: "Subsection created successfully.",
      //   updatedSection,
      data: updatedSection,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to create sub-section.",
      error: err.message,
    });
  }
};

// updateSubSection
exports.updateSubSection = async (req, res) => {
  try {
    // fetch data from req.body
    const { sectionId, subSectionId, title = "", description = "" } = req.body;
    // console.log("sectionId", sectionId);
    // console.log("title", title);
    // console.log("subsectionId", subSectionId);
    // console.log("description", description);

    // extract file/video
    const video = req.files.videoUrl;
    // console.log("videoUrl", video);

    // validation
    if (!subSectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // get subsectionDetails
    const subsectionDetails = await SubSection.findById(subSectionId);

    subsectionDetails.title = title;
    subsectionDetails.timeDuration = uploadDetails.duration;
    subsectionDetails.description = description;
    subsectionDetails.videoUrl = uploadDetails.secure_url;
    await subsectionDetails.save();
    const section = await Section.findById(sectionId)
      .populate("subSections")
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully.",
      data: section,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to update sub-section.",
      error: err.message,
    });
  }
};

// deletesubsection
exports.deleteSubSection = async (req, res) => {
  try {
    // fetch subsectio id
    const { subSectionId, sectionId } = req.body;

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $pull: { subSections: subSectionId } },
      { new: true }
    )
      .populate("subSections")
      .exec();

    await SubSection.findByIdAndDelete({ _id: subSectionId });

    return res.status(200).json({
      success: true,
      message: "Subsection Deleted successfully.",
      data: updatedSection,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to Delete sub-section.",
      error: err.message,
    });
  }
};
