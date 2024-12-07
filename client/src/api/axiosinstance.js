import axios from 'axios';


const axiosInstance = axios.create({
    baseURL : process.env.VITE_API_URL || "http://localhost:5000",
    
})

axiosInstance.interceptors.request.use(config=>{
    const token = (sessionStorage.getItem("token")) || '';
    if(token){
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`
    }
    return config;
},(err)=>Promise.reject(err))

export default axiosInstance;