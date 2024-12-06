import React from "react";
import "./styles/FAQ.css";
import Header from "../../components/student-view/home/header";
import Footer from "../../components/student-view/home/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "What is LMS?",
      answer: "LMS is an online learning platform that offers a variety of courses to enhance your skills.",
    },
    {
      question: "How can I enroll in a course?",
      answer: "You can browse courses, select one, and enroll by following the on-screen instructions.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, and other online payment methods.",
    },
    {
      question: "Can I get a refund?",
      answer: "Yes, you can request a refund within 14 days of purchase, subject to our refund policy.",
    },
  ];

  return (
    <>
        <Header color/>
    <div className="faq">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-content">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default FAQ;
