require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = 3000;
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

connectDb();

// Middleware to parse request bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(
  session({
    secret: "process.env.MONGO_URI",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 1000, // 5 minutes
    },
  })
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/announcements", announceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applicants", applicantRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/requests", restRoutes);
app.use("/api/quit-requests", quitJobRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/colleges", collegeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
