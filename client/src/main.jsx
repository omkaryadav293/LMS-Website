import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth-context/index.jsx'
import InstructorProvider from "./context/instructor-context/index.jsx"
import StudentProvider from './context/student-context/index.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/lms-website-frontend">
  <AuthProvider>
    <InstructorProvider>
      <StudentProvider>
       <App />
       </StudentProvider>
    </InstructorProvider>
  </AuthProvider> 
  </BrowserRouter>   
)
