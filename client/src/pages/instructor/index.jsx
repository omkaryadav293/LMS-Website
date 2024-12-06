import React, { useContext, useEffect, useState } from "react";
import "./InstructorPage.css";
import InstructorDashboard from "../../components/instructor-view/dashboard";
import InstructorCourses from "../../components/instructor-view/courses/index";
import { InstructorContext } from "../../context/instructor-context";
import { fetchInstructorCourselistService } from "../../services";

export default function InstructorPage() {
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const {instructorCoursesList, setInstructorCoursesList} =useContext(InstructorContext)
  
  const fetchAllCourses  = async()=>{
     const response = await fetchInstructorCourselistService();
     
    if(response.success) setInstructorCoursesList(response?.data);
  }


  useEffect(()=>{
      fetchAllCourses();
  },[])




  const menuItems =[
    {
        icon : '/dashboard.svg',
        label : 'Dashboard',
        value : 'dashboard',
        component : <InstructorDashboard/>
    
    },
    {
        icon : '/course.svg',
        label : 'Courses',
        value : 'courses',
        component : <InstructorCourses/>
    
    },
    {
        icon : '/logout.svg',
        label : 'Logout',
        value : 'logout',
        component : null
    
    }
]

  const handleMenuClick = (value) => {
    if (value === "logout") {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    if(value === "courses"){
      setSelectedItem("courses")
    }
    if(value === "dashboard"){
      setSelectedItem("dashboard")
    }
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "courses":
        return <InstructorCourses listOfCourses={instructorCoursesList} />;
      // You can add more cases for other components here as needed
      case "dashboard":
      default:
        return <InstructorDashboard listOfCourses={instructorCoursesList} />;
      
    }
  };

  const CurrentComponent = menuItems.find(item => item.value === selectedItem)?.component;


  

  return (
    <div className="instructor-page">
      <aside className="sidebar">
        <h2 className="sidebar-title">Instructor Panel</h2>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${selectedItem === item.value ? "active" : ""}`}
              onClick={() => handleMenuClick(item.value)}
            >
              <img className="icon" src={item.icon} alt="" />
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        <h1>Dashboard</h1>
        <div className="content-display">
        {renderContent()}
        </div>
      </main>
    </div>
  );
}
