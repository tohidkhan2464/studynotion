require("dotenv").config();
const nodemailer = require("nodemailer");


exports.contactUsController = async (req, res) => {
  try {
    const { email, firstName, lastName = "", message } = req.body;

    let transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    // send mail
    let info = await transporter.sendMail({
        from: "StudyNotion || Tohid Khan",
        to: `${email}`,
        subject: `Message from ${firstName} ${lastName}`,
        html: `${message}`,
    });

    return info;

  } catch (err) {
    console.log("error -> ", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
