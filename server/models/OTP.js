const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {otpTemplate} = require("../mail/templates/emailVerificationTemplate");

const OTPschema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10 * 60,
    },

});

// Function to send email
async function sendVerificationEmail(email, otp){
    try {

        const mailResponse = await mailSender(email, "Verification email from StudyNotion", otpTemplate(otp));
        // console.log("Email sent successfully", mailResponse);
        
    } catch (err) {
        console.log("Error occured while sending Mail -> ",err);
        throw err;
    }
}

OTPschema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
} );

module.exports = mongoose.model("OTP", OTPschema);