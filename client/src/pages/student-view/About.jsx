import React from "react";
import "./styles/About.css";
import Header from "../../components/student-view/home/header";
import Footer from "../../components/student-view/home/Footer";

const AboutUs = () => {
  return (
    <div className="about-us">
      <Header/>
      <div className="about-header">
        <h1>About Us</h1>
        <p>Empowering Learning, Transforming Lives</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            At LMS, we are dedicated to providing a comprehensive learning experience
            through innovative and interactive online courses. Our mission is to bridge
            the gap between learners and the knowledge they need to succeed in their careers
            and personal growth.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            To become a global leader in e-learning, fostering a community where anyone
            can gain new skills, explore their potential, and achieve their dreams.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Innovation</li>
            <li>Inclusivity</li>
            <li>Excellence</li>
            <li>Community</li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutUs;
