import React, { useContext } from "react";
import "./styles/FeaturedCourses.css";
import { useNavigate } from "react-router-dom";

const FeaturedCourses = ({courseList}) => {
  const navigate = useNavigate();
  return (
    <section className="featured-courses">
      <h2>Featured Courses</h2>
      <div className="courses-grid">
        {courseList.map((course,index) => (
         index<4 && <div className="course-card" onClick={()=>navigate(`/course/details/${course._id}`)} key={course._id}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>${course.pricing}</p>
            <button className="btn enroll-btn">Enroll Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
