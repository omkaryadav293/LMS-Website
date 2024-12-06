import React, { useContext } from 'react';
import { InstructorContext } from '../../../../context/instructor-context/index';
import { courseLandingPageFormControls } from '../../../../config/index';
import "./styles/course-landing-page.css" 

export default function CourseLandingComponent() {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseLandingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Implement submit/save logic here
  };
  

  return (
    <div className="course-landing-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="course-landing-form">
        {courseLandingPageFormControls.map((field) => (
          <div key={field.name} className="form-field">
            <label htmlFor={field.name}>{field.label}</label>
            {field.componentType === 'input' && (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={courseLandingFormData[field.name] || ''}
                onChange={handleChange}
              />
            )}
            {field.componentType === 'textarea' && (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={courseLandingFormData[field.name] || ''}
                onChange={handleChange}
              />
            )}
            {field.componentType === 'select' && (
              <select
                id={field.name}
                name={field.name}
                value={courseLandingFormData[field.name] || ''}
                onChange={handleChange}
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

