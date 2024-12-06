import React, { useEffect } from "react";
import "./LockDialog.css";

const LockDialog = ({ lockCourse }) => {
  useEffect(() => {
    // Disable scrolling when the dialog is active
    if (lockCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      // Ensure scrolling is re-enabled on cleanup
      document.body.style.overflow = "auto";
    };
  }, [lockCourse]);

  if (!lockCourse) return null;

  return (
    <div className="lock-dialog-overlay">
      <div className="lock-dialog-box">
        <h2>Course Locked</h2>
        <p>You need to purchase this course to access the content.</p>
      </div>
    </div>
  );
};

export default LockDialog;
