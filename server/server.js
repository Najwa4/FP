require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const port = 5000;
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connectDb = require("./database/connect");
const usersRoutes = require("./routes/userRoutes");
const announceRoutes = require("./routes/announceRoutes");
const authRoutes = require("./routes/authRoutes");
const applicantRouter = require("./routes/applicantRouter");
const employeeRoutes = require("./routes/employeeRoutes");
const restRoutes = require("./routes/restRoutes");
const quitJobRoutes = require("./routes/QuitJobRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const cors = require("cors");
const multer = require("multer");

connectDb();

// Middleware to parse request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "process.env.MONGO_URI",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 60 * 1000, // 5 minutes
    },
  })
);

// photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/add", upload.single("selectedFile"), (req, res) => {
  const fileName = req.file.originalname;
  console.log(req.body.fname);
  console.log(fileName);
  const filePath = "http://127.0.0.1:5000/images/" + fileName;
  console.log(filePath);
});

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/announcements", announceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applicants", applicantRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/rest", restRoutes);
app.use("/api/quit", quitJobRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/colleges", collegeRoutes);

app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
