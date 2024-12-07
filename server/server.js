const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const signupRoutes = require('./routes/auth-routes/signup');
const loginRoutes = require('./routes/auth-routes/login');
const checkAuthRoutes = require('./routes/auth-routes/check-Auth');
const UploadRoute = require('./routes/instructor-routes/upload.js');
const DeleteRoute = require('./routes/instructor-routes/delete.js');

const StudentCoursesRoutes = require("./routes/student-routes/student-courses-routes.js")
const InstructorCourseRoutes = require('./routes/instructor-routes/course-routes.js');
const StudentViewCourseRoutes = require("./routes/student-routes/course-routes.js");
const StudentViewOrderRoutes  = require("./routes/student-routes/order-routes.js");
const CourseProgressRoutes = require("./routes/student-routes/course-progress-routes.js");



dotenv.config();
//database connection
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ['Content-Type', "Authorization"]
}));

app.use(express.json());


//routes  configuration
app.get("/", (req, res) => {
    res.send("Backend is working!");
  });

app.use('/signup', signupRoutes);  // Handles `/signup/register`
app.use('/login', loginRoutes);     // Handles `/login`
app.use("/check-auth", checkAuthRoutes);
app.use("/media", UploadRoute);
app.use("/media", DeleteRoute);
app.use("/instructor/course", InstructorCourseRoutes);
app.use("/student/course", StudentViewCourseRoutes);
app.use("/student/order", StudentViewOrderRoutes);
app.use("/student/courses-bought", StudentCoursesRoutes)
app.use("/student/course-progress", CourseProgressRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
