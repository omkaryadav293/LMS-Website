import React from "react";
import "./styles/Testimonial.css";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521566652839-697aa473761a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", // Replace with a real image URL
      blog: "This platform has completely transformed the way I learn! The courses are well-structured, and the user interface makes navigating the site a breeze. Highly recommend it to anyone looking to enhance their skills!",
    },
    {
      id: 2,
      image: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with a real image URL
      blog: "As an instructor, this website has allowed me to reach a wider audience with ease. The course creation tools are intuitive, and the support team is outstanding. A game-changer for educators!",
    },
  ];

  return (
    <div className="testimonial-section">
      <h2>What Our Users Say</h2>
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className={`testimonial ${index % 2 === 0 ? "reverse" : ""}`}
        >
          <div className="testimonial-image">
            <img src={testimonial.image} alt="User" />
          </div>
          <div className="testimonial-content">
            <p>{testimonial.blog}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonial;
