import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>LMS</h2>
          <p>
            Your trusted platform for learning and skill development. Empowering 
            you to achieve your goals through quality content and interactive learning.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/contact">contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
        <div className="footer-section newsletter">
          <h3>Subscribe</h3>
          <p>Stay updated with our latest courses and offers.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LMS. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
