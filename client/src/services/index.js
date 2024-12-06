import axiosInstance from "../api/axiosinstance";

export const registerService = async (formData) => {
    try {
        const {data} = await axiosInstance.post("/signup/register", formData);
        return data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : "Network error");
    }
};

export const loginService = async (formData) => {
    try {
        const {data} = await axiosInstance.post('/login', formData);
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error; // Rethrow error to handle it in the calling function
    }
};

export const checkAuthService = async () => {
    try {
        const  {data}  = await axiosInstance.get('/check-auth');
      
        return data;
    } catch (error) {
        console.error("Error in checkAuthService:", error);
        throw error;
    }
    
};

export const mediaUploadService = async (formData) => {
    try {
        const  {data}  = await axiosInstance.post('/media/upload', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        });
      
        return data;
    } catch (error) {
        console.error("Error in mediaUploadService:", error);
        throw error;
    }
    
};

export const mediaDeleteService = async (id) => {
    try {
        const  {data}  = await axiosInstance.delete(`/media/delete/${id}`);
        
        return data;

    } catch (error) {
        console.error("Error in mediaDeleteService:", error);
        throw error;
    } 
};

export const fetchInstructorCourselistService = async()=>{
    try {
        const {data} = await axiosInstance.get(`/instructor/course/get`);
      
        return data;

    } catch (error) {
        console.error("Error in  fetchInstructorCourselistService:", error);
        throw error;
    }
};

export const addNewCourseService = async(formData)=>{
    try {
        const {data} = await axiosInstance.post(`/instructor/course/add`, formData);
      
        return data;

    } catch (error) {
        console.error("Error in  addNewCourseService:", error);
        throw error;
    }
};

export const fetchInstructorCourseDetailsService = async(id)=>{
    try {
        const {data} = await axiosInstance.get(`/instructor/course/get/details/${id}`);
      
        return data;

    } catch (error) {
        console.error("Error in fetchInstructorCourseDetailsService :", error);
        throw error;
    }
};

export const updateCourseByIdService = async(id,formData)=>{
    try {
        const {data} = await axiosInstance.put(`/instructor/course/update/${id}`, formData);
       
        return data;

    } catch (error) {
        console.error("Error in  updateCourseByIdService:", error);
        throw error;
    }
};

export const mediaBulkUploadService = async (formData) => {
    try {
        const  {data}  = await axiosInstance.post('/media/bulk-upload', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        });
      
        return data;
    } catch (error) {
        console.error("Error in mediaUploadService:", error);
        throw error;
    }
    
};

export const fetchStudentViewCourseListService = async()=>{
      
    try {
        const  {data}  = await axiosInstance.get('/student/course/get');
       
        return data;
    } catch (error) {
        console.error("Error in StudentViewCourseListService:", error);
        throw error;
    }
};

export const fetchStudentViewCourseDetailsService = async(id)=>{
      
    try {
        const  {data}  = await axiosInstance.get(`/student/course/get/details/${id}`);
        
        return data;
    } catch (error) {
        console.error("Error in StudentViewCourseDetailsService:", error);
        throw error;
    }
};

export const createPaymentService = async(formdata)=>{
    const {data} = await axiosInstance.post(`/student/order/create`, formdata);
    return data;
};

export const captureAndFinalizePaymentService=async(paymentId,payerId,orderId)=>{
    const {data} = await axiosInstance.post(`/student/order/capture`, {paymentId,payerId, orderId}     
    );
    return data;
};

export const fetchStudentBoughtCoursesService = async(studentId)=>{
      const {data} = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);

      return data;
};

export const getCurrentCourseProgressService = async(userId, courseId)=>{
    const {data} = await axiosInstance.get(`/student/course-progress/get/${userId}/${courseId}`);

    return data;
};

export const markLectureAsViewedService = async(userId, courseId, lectureId)=> {
    const { data } = await axiosInstance.post(
      `/student/course-progress/mark-lecture-viewed`,
      {
        userId,
        courseId,
        lectureId,
      }
    );
  
    return data;
};
  
export const resetCourseProgressService = async(userId, courseId)=> {
    const { data } = await axiosInstance.post(
      `/student/course-progress/reset-progress`,
      {
        userId,
        courseId,
      }
    );
  
    return data;
};





