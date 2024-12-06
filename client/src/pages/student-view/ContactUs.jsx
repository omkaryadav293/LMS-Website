import React from "react";
import "./styles/ContactUs.css";
import Footer from "../../components/student-view/home/Footer";
import Header from "../../components/student-view/home/header";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <Header/>
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’re here to help you. Reach out to us!</p>
      </div>
      <div className="contact-form-container">
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;
