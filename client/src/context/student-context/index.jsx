import { createContext, useEffect, useState } from "react";

export const StudentContext  = createContext(null);

export default function StudentProvider({children}){
    const [studentViewCourseList, setStudentViewCourseList] = useState([])
    const [studentViewCourseDetails,setStudentViewCourseDetails]=useState(null);
    const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
    const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] = useState({})
    const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([]);
 
    
    
    return <StudentContext.Provider
      value={{
        studentViewCourseList, setStudentViewCourseList,
        studentViewCourseDetails,setStudentViewCourseDetails,
        currentCourseDetailsId, setCurrentCourseDetailsId,
        studentBoughtCoursesList, setStudentBoughtCoursesList,
        studentCurrentCourseProgress, setStudentCurrentCourseProgress
      }}
    >
        {children}</StudentContext.Provider>
}