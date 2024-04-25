const express = require("express");
const router = express.Router();

// Routes for Login, Signup,sendotp ,changepassword  and Authentication and resetpassword;

// Import the required controllers and middleware functions
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controller/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controller/ResetPassword");
const { auth } = require("../middleware/Auth");

// ********************************************************************************************************
//                                      Authentication routes                                             *
// ********************************************************************************************************
router.post("/login", login); // Route for user login
router.post("/signup", signUp); // Route for user signup
router.post("/sendotp", sendOTP); // Route for sending OTP to the user's email
router.post("/changepassword", auth, changePassword); // Route for Changing the password

// ********************************************************************************************************
//                                      Reset Password                                                    *
// ********************************************************************************************************
router.post("/reset-password-token", resetPasswordToken); // Route for generating a reset password token
router.post("/reset-password", resetPassword); // Route for resetting user's password after verification

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { auth } = require("../middleware/Auth");
// const {
//   login,
//   signUp,
//   changePassword,
//   sendOTP,
// } = require("../controller/Auth");
// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controller/ResetPassword");

// router.post("/login", login);
// router.post("/signup", signUp);
// router.post("/sendotp", sendOTP);
// router.post("/changepassword", auth, changePassword);
// router.post("/reset-password-token", resetPasswordToken);
// router.post("/reset-password", resetPassword);

// module.exports = router;
