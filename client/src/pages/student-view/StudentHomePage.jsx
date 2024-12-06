import React, { useContext, useEffect, useState } from "react";
import "../../pages/student-view/styles/StudentHomePage.css";
import Banner from "../../components/student-view/home/Banner";
import FeaturedCourses from "../../components/student-view/home/FeaturedCourses";
import Categories from "../../components/student-view/home/Categories";
// import Testimonials from "../../components/student-view/Testimonials";
// import Footer from "../../components/student-view/Footer";
import { AuthContext } from '../../context/auth-context';
import Header from "../../components/student-view/home/header";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/student-context";
import { fetchStudentViewCourseDetailsService, fetchStudentViewCourseListService } from "../../services";
import Footer from "../../components/student-view/home/Footer";
import Testimonial from "../../components/student-view/home/Testimonial";


function StudentHomePage() {
      const  {studentViewCourseList, setStudentViewCourseList} =useContext(StudentContext);
      const {authToken} = useContext(AuthContext)
      const fetchAllStudentViewCourses = async()=>{
        const response = await fetchStudentViewCourseListService();
        if(response?.success) setStudentViewCourseList(response.data);
      }

      useEffect(()=>{
         fetchAllStudentViewCourses();
      },[])

  console.log(authToken);
  return (
    <div className="app">
      {/* Render the dynamic header */}
      <Header />
      <Banner />
      <FeaturedCourses courseList={studentViewCourseList} />
      <Categories />
      <Testimonial/>
      <Footer/>
    </div>
  );
}

export default StudentHomePage;

