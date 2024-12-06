import React from "react";
import "./styles/Categories.css";
import { FaCode, FaChartLine, FaJava, FaNodeJs } from "react-icons/fa";
import { SiGamedeveloper, SiMicrosoftacademic, SiThealgorithms,SiPython  } from "react-icons/si";
import { GiArtificialIntelligence, GiCyberEye } from "react-icons/gi";
import { TbCloudComputing } from "react-icons/tb";
import { IoLogoAndroid } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Categories = () => {
   const navigate = useNavigate();
   const courseCategories = [
    { id: "web-development", label: "Web Development", icon:( <FaCode/>)},
    { id: "backend-development",label: "Backend Development", icon: <FaNodeJs />},
    { id: "data-science", label: "Data Science", icon: <FaChartLine/> },
    { id: "machine-learning", label: "Machine Learning", icon:<SiThealgorithms /> },
    { id: "artificial-intelligence", label: "Artificial Intelligence", icon: <GiArtificialIntelligence /> },
    { id: "cloud-computing", label: "Cloud Computing", icon: <TbCloudComputing /> },
    { id: "cyber-security", label: "Cyber Security", icon: <GiCyberEye />
    },
    { id: "mobile-development", label: "Mobile Development", icon:<IoLogoAndroid /> },
    { id: "game-development", label: "Game Development", icon: <SiGamedeveloper /> },
    { id: "software-engineering", label: "Software Engineering", icon: <SiMicrosoftacademic /> },
    { id: "python-development", label: "Python Development", icon: <SiPython /> },
    { id: "java-development", label: "Java Development", icon: <FaJava /> },
  ];

 
  
  return (
    <section className="categories">
      <h2>Browse Categories</h2>
      <div className="categories-grid">
        {courseCategories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <div className="category-icon">{cat.icon}</div>
            <h3>{cat.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
