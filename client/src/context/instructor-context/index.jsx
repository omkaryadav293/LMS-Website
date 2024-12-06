import { createContext, useContext, useState } from "react";
import { courseLandingInitialFormData, courseCurriculumInitialFormData } from "../../config";

export const InstructorContext =createContext(null);

export default function InstructorProvider({children}){
   const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData);

   const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData);
   
   const [instructorCoursesList, setInstructorCoursesList] = useState([]);
   const [currentEditedCourseId, setcurrentEditedCourseId]  = useState(null)

return  <InstructorContext.Provider value={
    {
    courseLandingFormData , setCourseLandingFormData,
    courseCurriculumFormData, setCourseCurriculumFormData,
    instructorCoursesList, setInstructorCoursesList,
    currentEditedCourseId, setcurrentEditedCourseId,
    }
}>
           {children}
    </InstructorContext.Provider>
}