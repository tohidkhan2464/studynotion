const { Mongoose } = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// create subsection
exports.createSubsection = async (req, res) => {
    try {

        // fetch data from req.body
        const { sectionId, title, timeDuration, description } = req.body;

        // extract file/video
        const video = req.files.videoFile;

        // validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: flase,
                message: "All fields are required.",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create the subsection
        const subsectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update the subsection id to the section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            { $push: { subSections: subsectionDetails._id, } },
            { new: true, },
        ).populate("subSections").exec()

        // // TODO :  log updated section here, after adding populate query

        // return response
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully.",
            updatedSection,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to create sub-section.",
            error: err.message,
        });
    }
}

// // TODO : updateSubsection
// updateSubSection
exports.updateSubsection = async (req, res) => {
    try {
        // fetch data from req.body
        const { subsectionId, title, timeDuration, description } = req.body;

        // extract file/video
        const video = req.files.videoFile;

        // validation
        if (!subsectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // get subsectionDetails
        const subsectionDetails = await SubSection.findById(subsectionId);

        subsectionDetails.title = title;
        subsectionDetails.timeDuration = timeDuration;
        subsectionDetails.description = description;
        subsectionDetails.videoUrl = uploadDetails.secure_url;
        await subsectionDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully.",
            subsectionDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to update sub-section.",
            error: err.message,
        });
    }
}

// // TODO : deleteSubsection
// deletesubsection
exports.deleteSubsection = async (req, res) => {
    try {
        // fetch subsectio id
        const { subsectionId, sectionId } = req.body;

        await Section.findByIdAndUpdate({ _id: sectionId }, { $pull: { subSections: { _id: subsectionId } } },{new:true});
        
        await SubSection.findByIdAndDelete( subsectionId);

        return res.status(200).json({
            success: true,
            message: "Subsection Deleted successfully.",
        });


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Unable to Delete sub-section.",
            error: err.message,
        });
    }
}