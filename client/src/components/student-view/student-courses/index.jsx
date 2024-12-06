import React, { useContext, useEffect } from 'react'
import { StudentContext } from '../../../context/student-context'
import { fetchStudentBoughtCoursesService } from '../../../services';
import { AuthContext } from '../../../context/auth-context';
import Header from "../home/header";
import "./StudentCoursesPage.css";
import { useNavigate } from 'react-router-dom';



const StudentCoursesPage = () => {
  const navigate = useNavigate();
  const {authToken}  = useContext(AuthContext);
  const {studentBoughtCoursesList, setStudentBoughtCoursesList} = useContext(StudentContext);

  const fetchStudentBoughtCourses = async()=>{
    const response = await fetchStudentBoughtCoursesService(authToken.user.id);
    if(response.success){
      setStudentBoughtCoursesList(response.data);
    }
  }

  useEffect(()=>{
    fetchStudentBoughtCourses();

  })
  return (
    <div>
      <Header color />
      <div className="student-courses-page-container">
        <h1>Your Purchased Courses</h1>
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          <div className="courses-page-list">
            {studentBoughtCoursesList.map((course) => (
              <div key={course.courseId} className="course-page-card">
                <img
                  src={course.courseImage}
                  alt={course.title}
                  className="course-page-image"
                />
                <div className="course-page-details">
                  <h3>{course.title}</h3>
                  <p>By {course.instructorName}</p>
                  <p>Purchased on: {course.dateOfPurchase.slice(0, 10)}</p>
                  <button onClick={()=>navigate(`/course-progress/${course.courseId}`)} className="btn start-course-btn">Start Course</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='purchaseSomething'>You haven’t purchased any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage
