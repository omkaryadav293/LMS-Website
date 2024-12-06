import React, { useContext, useEffect, useState } from "react";
import { sortOptions, filterOptions } from "../../../config";
import "./StudentViewCoursePage.css"; 
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";
import { StudentContext } from "../../../context/student-context";
import Header from "../home/header";
import { useNavigate, useSearchParams } from "react-router-dom";
import {fetchStudentBoughtCoursesService, fetchStudentViewCourseListService} from "../../../services/index"
import { AuthContext } from "../../../context/auth-context";
import Footer from "../home/Footer";

const StudentViewCoursePage = () => {

  const {authToken, checkAuthUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [color, setColor] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSelectedSort]= useState(searchParams.get("sort")||"");
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get("category") || "",
    level: searchParams.get("level") || "",
    primaryLanguage: searchParams.get("primaryLanguage") || "",
  });
  const {studentViewCourseList,setStudentViewCourseList,studentBoughtCoursesList,setStudentBoughtCoursesList} = useContext(StudentContext); 

    
  
  



    // Update URL when a filter changes
    const updateSearchParams = (key, value) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      setSearchParams(params);
    };

    // Handle filter changes
  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    updateSearchParams(filterKey, value);
  };
   
    // Handle sorting changes
  const handleSortChange = (value) => {
    setSelectedSort(value);
    updateSearchParams("sort", value);
  };

    // Handle filter and search logic
  const filteredCourses = studentViewCourseList
    .filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((course) => {
      if (selectedFilters.category && course.category !== selectedFilters.category) return false;
      if (selectedFilters.level && course.level !== selectedFilters.level) return false;
      if (
        selectedFilters.primaryLanguage &&
        course.primarylanguage !== selectedFilters.primaryLanguage
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "price-lowtohigh":
          return a.pricing - b.pricing;
        case "price-hightolow":
          return b.pricing - a.pricing;
        case "title-atoz":
          return a.title.localeCompare(b.title);
        case "title-ztoa":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    // Fetch the course list 
    const fetchAllStudentViewCourses = async()=>{
      const response = await fetchStudentViewCourseListService();
      if(response?.success) setStudentViewCourseList(response.data);
    }

    const fetchStudentBoughtCourses = async()=>{
      const response = await fetchStudentBoughtCoursesService(authToken.user.id);
      if(response.success){
        setStudentBoughtCoursesList(response.data);
      }
    }

    useEffect(()=>{
       fetchAllStudentViewCourses();
       fetchStudentBoughtCourses();
       

    },[])



    const handleCourseCardClick = async (courseId) => {
      if (authToken?.authenticate) {
       
        const purchased = studentBoughtCoursesList.some(
          (course) => course.courseId === courseId
        );
      
        if (purchased) {
          navigate(`/course-progress/${courseId}`);
        } else {
          navigate(`/course/details/${courseId}`);
        }
      } else {
        // Unauthenticated users can view course details
        navigate(`/course/details/${courseId}`);
      }
    };
  

  return (
    <>
        <Header color={color}/>
    <div className="explore-now">
      <header className="explore-header">
        <h1>Explore Courses</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch />
        </div>
        <span>{filteredCourses.length} courses found</span>
      </header>



      <div className="filters">
  {/* Sort Dropdown */}
  <div className="filter-item">
    <label htmlFor="sort">
      <FaSort /> Sort By:
    </label>
    <select
      id="sort"
      value={selectedSort}
      onChange={(e) => handleSortChange(e.target.value)}
    >
      <option value="">Select</option>
      {sortOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  </div>



  {/* Filter Dropdowns */}
  {Object.entries(filterOptions).map(([key, options]) => (
    <div className="filter-item" key={key}>
      <label htmlFor={key}>
        <FaFilter /> {key.charAt(0).toUpperCase() + key.slice(1)}:
      </label>
      <select
        id={key}
        value={selectedFilters[key]}
        onChange={(e) => handleFilterChange(key, e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt, index) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  ))}
</div>



      <div className="course-results">
      {filteredCourses.map((course) => (
          <div onClick={()=>handleCourseCardClick(course._id)}  className="course-card" key={course._id}>
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
               <h4>created By {course.instructorName}</h4>
            <div className="createdBy">
            <p>${course.pricing}</p>
            <p>{course.level}</p>
            </div>
            <button className="btn enroll-btn">Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
      <Footer/>
    </>
  );
};
export default StudentViewCoursePage;
