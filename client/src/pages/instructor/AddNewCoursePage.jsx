import React, { useState,useContext, useEffect } from 'react';
import './AddNewCourse.css';
import Curriculum from '../../components/instructor-view/courses/add-new-course/course-curriculam';
import CourseLandingPage from '../../components/instructor-view/courses/add-new-course/course-landing-page';
import Settings from '../../components/instructor-view/courses/add-new-course/course-settings';
import { useNavigate, useParams } from 'react-router-dom';
import { InstructorContext } from '../../context/instructor-context';
import { AuthContext } from '../../context/auth-context';
import { addNewCourseService, fetchInstructorCourseDetailsService, updateCourseByIdService } from '../../services';
import { courseCurriculumInitialFormData, courseLandingInitialFormData,} from '../../config';



const AddNewCoursePage = () => {
  const [activeSection, setActiveSection] = useState("Curriculum");
  const { courseLandingFormData,setCourseLandingFormData,courseCurriculumFormData, setCourseCurriculumFormData,currentEditedCourseId, setcurrentEditedCourseId} =useContext(InstructorContext);
  const {authToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  



  const renderSection = () => {
    switch (activeSection) {
      case "Curriculum":
        return <Curriculum />;
      case "CourseLandingPage":
        return < CourseLandingPage />;
      case "Settings":
        return <Settings/>;
      default:
        return null;
    }
  };

  function isEmpty(value){
    if(Array.isArray(value)){
      return value.length === 0 ;
    }
    return value === "" || value === null || value === undefined
  };

  function validateFormData () {
      for (const key in courseLandingFormData) {
        if(isEmpty(courseLandingFormData[key])){
          return false;
        }
      }

      let hasFreePreview = false;
      for (const item of courseCurriculumFormData) {
        if(isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)){
        return false;
        }
        if(item.freePreview){
          hasFreePreview = true; //found at least one free preview
        }
      }
      return hasFreePreview; // hasFreePreview by default false hai when item.freePreview is true than it'll be true
  };
  
  
  
  const handleCreateCourse = async()=>{
    const courseFinalFormData  ={
    instructorId : authToken?.user?.id,
    instructorName: authToken?.user?.name,
    primaryLanguage : courseLandingFormData?.primaryLanguage,
    welcomeMessage : courseLandingFormData?.welcomeMessage,
    date: new Date(),
    ...courseLandingFormData,
    image:courseLandingFormData?.image,
    students:  [],
    curriculam : courseCurriculumFormData,
    isPublished: true,
    }

    const response = 
    currentEditedCourseId !== null ? await updateCourseByIdService(currentEditedCourseId, courseFinalFormData) : await addNewCourseService(courseFinalFormData);
  
    if(response.success){
    // setCourseCurriculumFormData(courseCurriculumInitialFormData);
    // setCourseLandingFormData(courseLandingInitialFormData);
    
    navigate(-1);
    setcurrentEditedCourseId(null);
    }



    
  };

  const fetchCurrentCourseDetails = async ()=>{
    const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);
    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});
     
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculam)
    }
};


  useEffect(()=>{
    if (params?.id) setcurrentEditedCourseId(params?.id);
    },[params?.id]);

  useEffect(()=>{
    if(currentEditedCourseId !== null) fetchCurrentCourseDetails();
 },[currentEditedCourseId])
 
 
  return (
    <div className="add-course-page">
      
      <div className="course-header">
      
        <h2>Add New Course</h2>
       
        <button type='button' disabled={!validateFormData()} onClick={handleCreateCourse} className="submit-button">Submit</button>
      </div>

      <div className="section-buttons">
        <button 
          className={`section-button ${activeSection === "Curriculum" ? "active" : ""}`} 
          onClick={() => setActiveSection("Curriculum")}
        >
          📘 Curriculum
        </button>
        <button 
          className={`section-button ${activeSection === "CourseLandingPage" ? "active" : ""}`} 
          onClick={() => setActiveSection("CourseLandingPage")}
        >
          📄 Course Landing Page
        </button>
        <button 
          className={`section-button ${activeSection === "Settings" ? "active" : ""}`} 
          onClick={() => setActiveSection("Settings")}
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="section-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AddNewCoursePage;
