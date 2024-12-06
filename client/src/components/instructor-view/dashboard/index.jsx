import React, { useMemo } from 'react';
import './instructorDashboard.css';

const InstructorDashboard = ({ listOfCourses }) => {
  // Calculate total students and total revenue
  const totalData = useMemo(() => {
    let totalStudents = 0;
    let totalRevenue = 0;
    const studentList = [];

    listOfCourses.forEach((course) => {
      const { students = [], title } = course;
      totalStudents += students.length;
      totalRevenue += students.reduce((sum, student) => sum + parseFloat(student.paidAmount || 0), 0);

      students.forEach((student) => {
        studentList.push({
          studentName: student.studentName,
          studentEmail: student.studentEmail,
          courseTitle: title,
        });
      });
    });

    return { totalStudents, totalRevenue, studentList };
  }, [listOfCourses]);

  return (
    <div className="dashboard-container">
      {/* Dashboard Summary */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Students</h3>
          <p>{totalData.totalStudents}</p>
        </div>
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>${totalData.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Student Details Table */}
      <div className="student-details">
        <h2>Student Details</h2>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Course Purchased</th>
            </tr>
          </thead>
          <tbody>
            {totalData.studentList.map((student, index) => (
              <tr key={index}>
                <td>{student.studentName}</td>
                <td>{student.studentEmail}</td>
                <td>{student.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorDashboard;
