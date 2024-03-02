const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    lasttName: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    accountType: {
        type: String,
        require: true,
        enum: ["Admin", "Instructor", "Student"],
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
    }],
    image: {
        type: String,
        required: true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    },
    
});

module.exports = mongoose.model("User", userSchema);