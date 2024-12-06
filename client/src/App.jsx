import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/LogIn'
import Signup from './pages/auth/SignUp';
import { AuthContext } from './context/auth-context';
import RouteGuard from './components/route-guard';
import InstructorDashboardPage from './pages/instructor';
import StudentHomePage from './pages/student-view/StudentHomePage';
import NotFound from './components/loader/NotFound';
import AddNewCoursePage from './pages/instructor/AddNewCoursePage';
import StudentViewCoursePage from './components/student-view/course';
import StudentViewCourseDetailsPage from './components/student-view/course-details';
import PaypalPaymentReturnPage from './components/student-view/payment-return';
import StudentCoursesPage from './components/student-view/student-courses';
import StudentViewCourseProgressPage from './pages/course-progress-page';
import FAQ from './pages/student-view/FAQ';
import AboutUs from './pages/student-view/About';
import ContactUs from './pages/student-view/ContactUs';

const App = () => {
  const {authToken} = useContext(AuthContext);
  return (
    <Routes>
     <Route path="/login" element={
      <RouteGuard
      element={<Login/>} 
      authenticated = {authToken.authenticate} 
      user={authToken?.user}
       />} />
     <Route path="/signup" element={<Signup/>} />

     <Route path="/instructor" element={
     <RouteGuard 
     element={<InstructorDashboardPage/>}
     authenticated = {authToken.authenticate} 
     user={authToken?.user}
     />} />
     <Route path="/instructor/add-course" element={
     <RouteGuard 
     element={<AddNewCoursePage/>}
     authenticated = {authToken.authenticate} 
     user={authToken?.user}
     />} />
     <Route path="/instructor/edit-course/:id" element={
     <RouteGuard 
     element={<AddNewCoursePage/>}
     authenticated = {authToken.authenticate} 
     user={authToken?.user}
     />} />



     <Route path="/payment-return" element={<PaypalPaymentReturnPage/>} />
     <Route path="/student-courses" element={<StudentCoursesPage/>} />
     <Route path="/course-progress/:id" element={<StudentViewCourseProgressPage/>} />
     <Route path="/" element={<StudentHomePage/>} />
     <Route path="" element={<StudentHomePage/>}/>
     <Route path="/courses" element={<StudentViewCoursePage/>}/>
     <Route path="/contact" element={<ContactUs/>}/>
     <Route path="/about" element={<AboutUs/>}/>
     <Route path="/faq" element={<FAQ/>}/>
     <Route path="/course/details/:id" element={<StudentViewCourseDetailsPage/>}/>

     <Route path="*" element={<NotFound/>}/>
     
    </Routes>

  )
}

export default App
