// Curriculum.jsx
import React, { useContext, useRef, useState } from 'react';
import {InstructorContext} from '../../../../context/instructor-context/index'
import './styles/course-curriculum.css';
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from '../../../../services';
import VideoPlayer from "../../../video-player/index";
import { FiUpload } from "react-icons/fi";
import { TbReplace } from "react-icons/tb";

const Curriculum = () => {
  const {courseCurriculumFormData, setCourseCurriculumFormData,} = useContext(InstructorContext);
   
  const bulkUploadInputRef = useRef(null)

  const handleOpenBulkUploadDialog = ()=>{
    bulkUploadInputRef.current?.click()
  }

  const areAllCourseCurriculumFormDataObjectsEmpty = (arr)=>{
    return arr.every(obj=>{

      return Object.entries(obj).every(([key,value])=>{
        if(typeof value === "boolean"){
            return true;
        }
        return value === "";
      })
    })
  }

  // Add a new lecture
  const addLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { title: "", videoUrl: "", freePreview: false, public_id: "" },
    ]);
  };

  // Handle title change
  const handleTitleChange = (index, value) => {
    const updatedLectures = [...courseCurriculumFormData];
    updatedLectures[index].title = value;
    setCourseCurriculumFormData(updatedLectures);
   
  };

  // Handle free preview toggle
  const toggleFreePreview = (index) => {
    const updatedLectures = [...courseCurriculumFormData];
    updatedLectures[index].freePreview = !updatedLectures[index].freePreview;
    setCourseCurriculumFormData(updatedLectures);
   
  };

  // Handle file upload
  const handleFileChange = async(index, file) => {
    
    const selectedFile = file;
  
    if(selectedFile){
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      
      try{
        (true);
        const response = await mediaUploadService(videoFormData);
        if(response.success){
          let copyCourseCurriculumFormData = [...courseCurriculumFormData];
          copyCourseCurriculumFormData[index] = {...copyCourseCurriculumFormData[index], videoUrl: response.data.url, 
            public_id: response.data.public_id,
          }
          setCourseCurriculumFormData(copyCourseCurriculumFormData);
          
        }
        
      }catch(err){
        console.log(err, "error in uploading medias")
      }
    }
    

  };

  // Handle Replace Video
  const handleReplaceVideo = async (index)=>{
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    const selectedVideo = copyCourseCurriculumFormData[index].public_id;
    const deleteVideoResponse = await mediaDeleteService(selectedVideo);
    if(deleteVideoResponse.success){
      copyCourseCurriculumFormData[index] ={
        ...copyCourseCurriculumFormData[index], 
        videoUrl:"",
        public_id: "",
      }
      setCourseCurriculumFormData(copyCourseCurriculumFormData);
    }
  };

  // Handle Delete Lecture
  const handleDeleteLecture = async(index)=>{
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
  
    const publicId = copyCourseCurriculumFormData[index].public_id;
    const response = await mediaDeleteService(publicId);
    if(response.success){
    copyCourseCurriculumFormData = copyCourseCurriculumFormData.filter((item,lectureIndex)=> lectureIndex !== index);
    setCourseCurriculumFormData(copyCourseCurriculumFormData)
  } 
  };

  // Handle Bulk Upload feature 
  const handleMediaBulkUpload = async(event)=>{
    const selectedFile = Array.from(event.target.files);
    const bulkFormData = new FormData();
    selectedFile.forEach(async (fileItem)=>{
      bulkFormData.append('files', fileItem);
      try {
        const response = await mediaBulkUploadService(bulkFormData)
        if(response?.success){
          let copyCourseCurriculumFormData =areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)?[] : [...courseCurriculumFormData];
         
         copyCourseCurriculumFormData = [
          ...copyCourseCurriculumFormData, 
          ...response.data.map((item, index)=>({
            videoUrl: item.url,
            public_id: item.public_id,
            title : `Lecture ${copyCourseCurriculumFormData.length + (index + 1)}`,
            freePreview: false,
          }))
        ]

        setCourseCurriculumFormData(copyCourseCurriculumFormData)
        }
       
      } catch (error) {
        console.log(error)
      }
    })


  
  };

  

  return (
    <div className="course-curriculum-container">
      <h2>Create Course Curriculum</h2>
      <div className="add-and-bulk-upload">
      <button   onClick={addLecture} className="add-lecture-btn">
        Add Lecture
      </button >
      <label onClick={handleOpenBulkUploadDialog} htmlFor='bulk-media-upload' className="add-lecture-btn">
      <FiUpload /> Bulk Upload
      </label>
      </div>
      <input 
      type="file"
      ref={bulkUploadInputRef}
      accept='video/*'
      multiple
      className='bulk-upload-input'
      id='bulk-media-upload'
      onChange= {(event)=>handleMediaBulkUpload(event)}
      />
      {courseCurriculumFormData.map((lecture, index) => (
        <div key={index} className="lecture-container">
          <div className="text-btn-container">
          <h3>Lecture {index + 1}</h3>
          <div className="btns-container">
          <button onClick={()=>{handleReplaceVideo(index)}} className="videoPlayer-btn-1"><TbReplace /> Replace video</button>
          <button onClick={()=>handleDeleteLecture(index)} className="videoPlayer-btn-2">🗑️ Delete Lecture</button>
          </div>

          </div>

          <input
            name={`title-${index + 1}`}
            type="text"
            placeholder="Enter Lecture Title"
            value={lecture.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
          />
          <div className="switch-container">
            <label>
              <input
                type="checkbox"
                checked={lecture.freePreview}
                onChange={() => toggleFreePreview(index)}
              />
              Free Preview
            </label>
          </div>
          
         { courseCurriculumFormData[index]?.videoUrl ? 
          <div className="videoPlayer">
             <VideoPlayer url= { courseCurriculumFormData[index]?.videoUrl}/> 
             
          </div> 
          : <input
            type="file"
            name='file'
            accept="video/*"
            className='videoFile'
            onChange={(e) => handleFileChange(index, e.target.files[0])}
          />
          }  
            
          
        </div>
      ))}
    </div>
  );
};

export default Curriculum;