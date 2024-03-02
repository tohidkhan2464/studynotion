const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {

        // creating Transporter
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
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Info -> ", info);
        return info;

    } catch (err) {
        console.log(err.message);
        console.log("can't Send the mail.")
    }
};

module.exports = mailSender;