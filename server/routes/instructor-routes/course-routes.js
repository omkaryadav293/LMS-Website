const express = require('express');
const { addNewCourse,getAllCourses,getCourseDetailsById,upadateCourseById } = require('../../controllers/instructor-controller/course-controller');

const router = express.Router();


router.post("/add", addNewCourse);
router.get('/get',  getAllCourses );
router.get('/get/details/:id',  getCourseDetailsById );
router.put("/update/:id", upadateCourseById);

module.exports = router;