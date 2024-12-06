import React, { useState } from 'react';
import './CongratulationDialog.css'; // For styling
import { useNavigate } from 'react-router-dom';

const CongratulationDialog = ({ isCompleted, handleResetCourse}) => {
    const navigate = useNavigate();
  if (!isCompleted) return null;

  return (
  <div className="dialog-overlay">
      <div className="dialog-box">
        <h1>🎉 Congratulations! 🎉</h1>
        <p>You have successfully completed the course.</p>
        <div className="dialogbtn">
        <button onClick={()=>navigate("/student-courses")} className="close-button">Dashboard</button>
        <button onClick={handleResetCourse} className="close-button">Rewatch Course</button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationDialog;
