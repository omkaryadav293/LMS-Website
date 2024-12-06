import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./InstructorCourses.css";
import { courseLandingInitialFormData, courseCurriculumInitialFormData } from "../../../config/index";
import { InstructorContext } from "../../../context/instructor-context";


const InstructorCourses = ({listOfCourses}) => {
  const navigate = useNavigate();
  const {setcurrentEditedCourseId,setCourseLandingFormData,setCourseCurriculumFormData} = useContext(InstructorContext);
 

  // // Temporary single course data; more courses can be mapped here in the future
  // const courses = [
  //   {
  //     name: "Intro to Web Development 2025",
  //     students: 120,
  //     revenue: "$2,400",
  //   },
  // ];

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h2>All Courses</h2>
        <button onClick={() =>{
          setcurrentEditedCourseId(null);
          setCourseCurriculumFormData(courseCurriculumInitialFormData);
          setCourseLandingFormData(courseLandingInitialFormData)
          navigate("/instructor/add-course")}
          }>Add New Course</button>
      </div>
      <div className="courses-list">
        <div className="instructor-course-row instructor-header">
          <span>Courses</span>
          <span>Students</span>
          <span>Revenue</span>
          <span>Actions</span>
        </div>
        {listOfCourses && listOfCourses.length> 0 ? listOfCourses.map((course, index) => (
          <div key={index} className="instructor-course-row">
            <span>{course.title}</span>
            <span>{course.students.length}</span>
            <span>${course.pricing * course.students.length}</span>
            <div className="actions">
              <button
               onClick={()=>{navigate(`/instructor/edit-course/${course?._id}`)}}
               className="edit-btn">✏️ Edit</button>
              <button className="delete-btn">🗑️ Delete</button>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
};

export default InstructorCourses;

