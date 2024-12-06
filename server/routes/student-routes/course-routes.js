const express = require('express');

const router = express.Router();

const {getAllStudentViewCourses, 
       getStudentViewCourseDetails,
      }
 = require("../../controllers/student-Controller/course-controller");


 router.get("/get", getAllStudentViewCourses);
 router.get("/get/details/:id", getStudentViewCourseDetails);
 

 module.exports = router;