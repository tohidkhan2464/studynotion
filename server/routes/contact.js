// import the required modules
const express = require("express");
const router = express.Router();

const { contactUs } = require("../controller/contactUs");

router.post("/", contactUs);

module.exports = router;