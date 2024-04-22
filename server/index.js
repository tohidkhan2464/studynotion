const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentsRotues = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUs = require("./routes/contact");
const search = require("./routes/search");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// database connect
database.connect();
// middleware
const allowedOrigins = [
  'https://studynotion-8f4u.vercel.app/',
  'http://localhost:3000',
  // 'https://collegechatts.netlify.app',
  '*',
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "https://localhost:3000",
//       "https://studynotion-8f4u.vercel.app/",
//       "*",
//     ],
//     credentials: true,
//   })
// );
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentsRotues);
app.use("/api/v1/reach/contact", contactUs);
app.use("/api/v1/search", search);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
