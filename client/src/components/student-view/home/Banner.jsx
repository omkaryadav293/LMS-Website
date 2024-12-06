import React from "react";
import "./styles/Banner.css";
import { useNavigate } from "react-router-dom";
const Banner = () => {

const navigate = useNavigate();

  return (
    <section className="banner">
     
      <div className="banner-content">
        <h1>Unlock Your Potential</h1>
        <p>Discover top-rated courses to elevate your skills and career.</p>
        <div className="banner-buttons">
          <button onClick={()=>{navigate("/courses")}} className="btn explore-btn">Explore Courses</button>
          <button className="btn join-btn">Join Now</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
