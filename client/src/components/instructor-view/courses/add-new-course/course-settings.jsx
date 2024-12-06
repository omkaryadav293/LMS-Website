
import React, { useContext, useState } from 'react';
import './styles/course-setting.css';
import { InstructorContext } from '../../../../context/instructor-context';
import { mediaUploadService } from '../../../../services';


const Settings = () => {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext);
  const [imagePreview, setImagePreview] = useState(null);
   const handleImageUploadChange = async (event)=>{
      
      const selectedImage = event.target.files[0];
       
      if(selectedImage){
        const imageFormData = new FormData();
        imageFormData.append("file", selectedImage)
        setImagePreview(URL.createObjectURL(selectedImage)); // Generate preview URL

        try{
           const response = await mediaUploadService(imageFormData);
           if(response.success){
           setCourseLandingFormData({...courseLandingFormData, image: response.data.url}) 
           }

        } catch(err){
          console.log(err)
        }
      }

 
   }
 

  return(
  <div className="course-setting-container">
      <h2>Course setting</h2>
      {courseLandingFormData?.image ? <div className="image-preview-container">
        
          <img
            src={imagePreview}
            alt="Preview"
            className="preview-image"
          />
       
      </div>  : <div className="setting-container">
          <h3>Upload course image</h3>
         
          <input 
            name="file"
            type="file"
            accept='image/*' 
            className='videoFile'
            onChange={(e)=>handleImageUploadChange(e)}
          />
    </div>
      } 
        
    </div>)
  
};

export default Settings;
