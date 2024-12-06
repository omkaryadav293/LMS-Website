import React, { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { StudentContext } from '../../context/student-context';
import { AuthContext } from '../../context/auth-context';
import { getCurrentCourseProgressService, markLectureAsViewedService, resetCourseProgressService, } from '../../services';
import "./courseProgress.css"
import Confetti from "react-confetti";
import Header from '../../components/student-view/home/header';
import LockDialog from '../../components/student-view/course-progress-components/LockDialog';
import CongratulationDialog from '../../components/student-view/course-progress-components/CongratulationDialog';
import VideoPlayer from '../../components/video-player';
import { FaPlay } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const StudentViewCourseProgressPage = () => {

  const navigate = useNavigate();
  
  const {authToken} = useContext(AuthContext);
  
  const {studentCurrentCourseProgress, setStudentCurrentCourseProgress} = useContext(StudentContext);
  const {id} = useParams();
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture]= useState(null)
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false);
  const [showConfetti, setShowConfetti] =useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const fetchCurrentCourseProgress = async ()=>{
     const response = await getCurrentCourseProgressService(authToken?.user?.id, id);
     

     if(response?.success){
      if(!response?.data?.isPurchased){
           setLockCourse(true);
      }else{
        setStudentCurrentCourseProgress({
          courseDetails : response?.data?.courseDetails,
          progress : response?.data?.progress,
        });
       

        if(response.data?.completed){
          setCurrentLecture(response.data.courseDetails.curriculam[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);
          return;
        }

        if (response?.data?.progress.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculam[0]);
        } else {
          const nextLecture = findNextLecture(
            currentLecture?._id,
            response?.data?.progress,
            response?.data?.courseDetails?.curriculam
        );
        
        setCurrentLecture(nextLecture || null); // Set to null if no next lecture
        
        }
      
     }
  } 
}

const findNextLecture = (currentLectureId, lecturesProgress, curriculum) => {
  const currentIndex = curriculum.findIndex((lecture) => lecture._id === currentLectureId);

  // If current lecture is the last one, there is no next lecture
  if (currentIndex === curriculum.length - 1) return null;

  // Find the next unviewed lecture after the current lecture
  for (let i = currentIndex + 1; i < curriculum.length; i++) {
      const isViewed = lecturesProgress.find((progress) => progress.lectureId === curriculum[i]._id)?.viewed;
      if (!isViewed) return curriculum[i]; // Return the first unviewed lecture
  }

  return null; // All subsequent lectures are viewed
};


const updateCourseProgress = async()=>{
     if(currentLecture){
      const response = await markLectureAsViewedService(authToken?.user?.id, studentCurrentCourseProgress?.courseDetails._id, currentLecture._id);
     
      if (response.success){
        fetchCurrentCourseProgress();
      }
     }

}

const handleResetCourse = async()=>{
  const response = await resetCourseProgressService(authToken?.user?.id, studentCurrentCourseProgress?.courseDetails._id);

  if(response.success){
   setCurrentLecture(studentCurrentCourseProgress?.courseDetails?.curriculam[0]);
   setTimeout(() => {
    setShowCourseCompleteDialog(false);
    setShowConfetti(false);
}, 300); 
   await fetchCurrentCourseProgress();
   
  }
}
  

  useEffect (()=>{
    fetchCurrentCourseProgress();
  },[id]);

  useEffect(()=>{
    if(currentLecture?.progressValue === 1){
      updateCourseProgress();
    }
  },[currentLecture])

  
 


   // Calculate progress percentage
   const totalLectures =
   studentCurrentCourseProgress?.courseDetails?.curriculam.length || 0;
 const completedLectures =
   studentCurrentCourseProgress?.progress?.filter((item) => item.viewed)
     .length || 0;
 const progressPercentage = totalLectures
   ? ((completedLectures / totalLectures) * 100).toFixed(2)
   : 0;


  return (
   <div className='course-progress-container'>
     
      <Header />
      {showConfetti && <Confetti/>}
      <div className="course-progress-body">
        <div className="course-progress-left">
           <VideoPlayer 
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture}/>
        </div>
        <div className="course-progress-right">
  {studentCurrentCourseProgress?.courseDetails ? (
    <>
      <h2>{studentCurrentCourseProgress.courseDetails.title}</h2>
      <div className="course-progress-box">
                <div className="lectureNumber">
                  <p>{progressPercentage}% completed</p>
                  <p>
                    {completedLectures} / {totalLectures}
                  </p>
                </div>
                <div className="underline">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
      </div>
      {studentCurrentCourseProgress?.courseDetails?.curriculam.map((lecture) => {
        const isViewed = studentCurrentCourseProgress?.progress?.find(
          (progressItem) => progressItem.lectureId === lecture._id
        )?.viewed;
        const isActive = currentLecture?._id === lecture._id; 


        return (
          <div 
            key={lecture?._id} 
            className={`course-progress-lecture-box ${isActive ? "active-lecture" : ""} ${isViewed ? "viewed" : ""}`}
            onClick={() => setCurrentLecture(lecture)} // Update the lecture when clicked
          >
            <div className="titleAndIcon">
              {lecture.title}  
              {isViewed ? (
                <IoMdCheckmarkCircleOutline color='green' size={24} />
              ) : (
                <FaPlay size={24} />
              )}
            </div>
          </div>
        );
      })}
    </>
  ) : (
    <p>Loading course details...</p>
  )}
</div>

      </div>
      <LockDialog lockCourse={lockCourse} />
      <CongratulationDialog handleResetCourse={handleResetCourse} isCompleted={showCourseCompleteDialog} />
    </div> 
  )


}

export default StudentViewCourseProgressPage; 