import React, { useEffect, useState } from "react";
import {  FaSignOutAlt, FaListAlt } from "react-icons/fa";
import "./styles/header.css";
import { SiConcourse } from "react-icons/si";
import { SlRocket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { PiMonitorPlayBold } from "react-icons/pi";
import { LiaPlaystation } from "react-icons/lia";
const Header = ({color}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the token in sessionStorage when the component mounts
    if (sessionStorage.getItem("token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
    
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    
  };
  const handleNavigate = ()=>{
    navigate("/")
  }


  return (
    <>
      <header className="header">
        {/* Left Section */}
        <div style={{ color: color? "black" : "white" }}  className={`header-left`}>
            <div className="header-center">
            <div onClick={handleNavigate} className="header-icon">
            <LiaPlaystation size={32}/>

          </div>
          <h1 onClick={handleNavigate} className="header-name">L M S</h1>
            </div>
            <div className="header-middle">
          <button onClick={()=> location.pathname.includes("/courses") ? null : navigate("/courses")} className="explore-btn">Explore Courses</button>
        </div>
        </div>
        

        {/* Middle Section */}

        {/* Right Section */}
        <div className="header-right">
          <div onClick={()=>navigate("/student-courses")}  style={{ color: color? "black" : "white" }}  className="header-option">
            <span >My Courses</span>
          <PiMonitorPlayBold size={30} />
          </div>

          {isAuthenticated ? (
        <button className="logout" onClick={handleLogout}>
          LogOut
        </button>
      ) : (
        <button className="login" onClick={handleLogin}>
          LogIn
        </button>
      )}



          </div>
      </header>
    </>
  );
};

export default Header;
