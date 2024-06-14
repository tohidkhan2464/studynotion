const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// Auth
exports.auth = async (req, res, next) => {
    try {

        // extract token
        const token = req.cookies.token
            || req.body.token  //Worst method
            || (req.headers['authorization'] && req.headers['authorization'].replace("Bearer ", ""));
            // || req.headers["AuthoriZation"].replace("Bearer ", ""); //Best method

        // if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found.",
            });
        }

        // verify the token using secret key
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token not match",
            });
        }
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while token Verifying.",
        });
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Student only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}


// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Instructor only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is the protected route for Admin only.",
            });
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role can't be verified",
        });
    }
}