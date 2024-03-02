const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { Mongoose } = require("mongoose");

// capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    try {
        // get courseId and UserId
        const { course_id } = req.body;
        const userId = req.User.id;
        // validation

        // valid courseId
        if (!course_id) {
            return res.json({
                success: false,
                message: "Please provide valid course ID.",
            });
        }

        // valid CourseDetails
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.json({
                    success: false,
                    message: "Could not find the course.",
                });
            }

            // user aready pay for same course
            const uid = new Mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student already enrolled."
                })
            }

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }

        // create order
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId,
            }
        };

        try {
            // initiate the paymwnt using Razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            // return response
            return res.status(200).json({
                success: true,
                message: "Payment initiated successfully.",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });


        } catch (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Could not initiate payment",
            })
        }


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// verifySignature of razorpay and server
exports.verifySignature = async (req, res) => {
    try {
        // 
        const webHookSecret = '12345';

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (signature === digest) {
            console.log("Payment is Authorised.");

            const { courseId, userId } = req.body.payload.payment.entity.notes;
            try {

                // fullfill the action

                // find the course and enroll the student
                const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId },
                    { $push: { studentsEnrolled: userId } }, { new: true },
                );

                if (!enrolledCourse) {
                    return res.status(500).json({
                        success: false,
                        message: "Course no found.",
                    });
                }
                console.log(enrolledCourse);

                // find the user and add the course to the their enrolled course list
                const enrolledStudent = await User.findOneAndUpdate({ _id: userId },
                    { $push: { courses: courseId } }, { new: true },
                );
                console.log(enrolledStudent);

                // send mail of the confirmation
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    "Congratulations from StudyNotion",
                    courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName),
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success: true,
                    message: "Signature verified and Course added.",
                })

            } catch (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid Rerquest",
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
