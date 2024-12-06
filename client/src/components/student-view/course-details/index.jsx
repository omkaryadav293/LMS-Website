import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from "../../../context/student-context";
import {
  createPaymentService,
  fetchStudentViewCourseDetailsService,
  fetchStudentBoughtCoursesService,
} from "../../../services";
import Header from "../home/header";
import { FaLock, FaUnlock, FaPlay } from "react-icons/fa";
import "./StudentViewCourseDetailsPage.css";
import { AuthContext } from "../../../context/auth-context";

const StudentViewCourseDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [color, setcolor] = useState(true);
  const { authToken} = useContext(AuthContext);
  const [approvalUrl, setApprovalUrl] = useState("");
  const [loading, setLoading] = useState(false); 
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    setCurrentCourseDetailsId,
    studentBoughtCoursesList,
    setStudentBoughtCoursesList
  } = useContext(StudentContext);

  const [videoUrl, setVideoUrl] = useState(null);

  const fetchStudentBoughtCourses = async()=>{
    const response = await fetchStudentBoughtCoursesService(authToken.user.id);
    if(response.success){
      setStudentBoughtCoursesList(response.data);
    }
  }

  useEffect(()=>{
    fetchStudentBoughtCourses();

  },[]);
  

  // Fetch course details by ID
  const fetchStudentViewCourseDetails = async () => {
  
    const response = await fetchStudentViewCourseDetailsService(id);
    if (response.success) {
      setStudentViewCourseDetails(response.data);
    } else {
      setStudentViewCourseDetails(null);
    }
  };

  const handleCreatePayment = async () => {
    if (!authToken.authenticate)
      alert("You must have logged in to purchase any course");
    setLoading(true); 
    const paymentPaylaod = {
      userId: authToken?.user?.id,
      name: authToken.user.name,
      email: authToken.user.email,
      orderStatus: "pending",
      paymentMethod: "paypal",
      PaymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails.instructorId,
      instructorName: studentViewCourseDetails.instructorName,
      courseImage: studentViewCourseDetails.image,
      courseTitle: studentViewCourseDetails.title,
      courseId: studentViewCourseDetails._id,
      coursePricing: studentViewCourseDetails.pricing,
    };
    const response = await createPaymentService(paymentPaylaod);
    if (authToken.authenticate && response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response.data.approveUrl);
    }
    setLoading(false); 
  };

  // Fetch course data on component mount or ID change
  useEffect(() => {
    if (id) {
      setCurrentCourseDetailsId(id);
      fetchStudentViewCourseDetails();
    }
  }, [id]);

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  if (!studentViewCourseDetails) return <div>Loading...</div>;

  const {
    title,
    description,
    pricing,
    instructorName,
    date,
    objectives,
    curriculam,
    category,
  } = studentViewCourseDetails;

  

  return (
    <>
      <Header color={color} />
      <div className="course-details-page">
        
         {/* Display loader when payment is in progress */}
         {loading && (
          <div className="purchase-loader-overlay">
            <div className="purchase-loader"></div>
          </div>
        )}
        <div className="course-details-header">
          <h1>{title}</h1>
          <p className="course-description">{description}</p>
          <div className="course-meta">
            <span>Created by: {instructorName}</span>
            <span>Created on: {date.slice(0, 10)}</span>
          </div>
        </div>

        {/* Content Containers */}
        <div className="course-body">
          {/* Left Section */}
          <div className="left-section">
            {/* Objectives Container */}
            <div className="objectives-container">
              <h2>What You'll Learn</h2>
              {objectives}
            </div>

            {/* Lectures Container */}
            <div className="lectures-container">
              <h2>Lectures</h2>
              <ul>
                {curriculam.map((lecture, index) => (
                  <li
                    key={index}
                    className={`lecture-item ${
                      lecture.freePreview ? "preview-available" : "locked"
                    }`}
                    onClick={() => {
                      if (lecture.freePreview) setVideoUrl(lecture.videoUrl);
                    }}
                  >
                    <span>{lecture.title}</span>
                    {lecture.freePreview ? (
                      <FaUnlock className="icon free-preview-icon" />
                    ) : (
                      <FaLock className="icon locked-icon" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            <div className="video-player">
              <h3>Free Preview</h3>
              {videoUrl ? (
                <video controls src={videoUrl}>
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>Select a lecture with free preview to watch.</p>
              )}
            </div>
            {studentBoughtCoursesList.some((item) => item.courseId === id) ? (
              <button
                onClick={() => navigate(`/course-progress/${id}`)}
                className="btn purchase-btn"
              >
                Start Watching
              </button>
            ) : (
              <button
                onClick={handleCreatePayment}
                className="btn purchase-btn"
              >
                Buy Now - ${pricing}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentViewCourseDetailsPage;
