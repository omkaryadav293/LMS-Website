const express = require('express');
const multer =  require('multer');
const path = require('path');

const { uploadMediaToCloudinary } = require('../../helpers/cloudinary');
const router = express.Router();

const upload = multer({dest: "uploads/"});

router.post('/upload', upload.single('file'), async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
     
    try{
        const absolutePath = path.resolve(req.file.path);
        const result = await uploadMediaToCloudinary(absolutePath)
        res.status(200).json({success: true, data: result,})
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Error uploading files",})
    }
})

router.post('/bulk-upload', upload.array('files', 10),async(req,res)=>{
    try{

        const uploadPromises = req.files.map(fileItem=>uploadMediaToCloudinary(fileItem.path));
        const results = await Promise.all(uploadPromises);

        res.status(200).json({success: true, data: results,})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false, message:"Error in bulk Uploading"})
    }
})


module.exports = router;
