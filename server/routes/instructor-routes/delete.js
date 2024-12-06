const express = require('express');
const {  deleteMediaToCloudinary } = require('../../helpers/cloudinary');
const router = express.Router();

router.delete('/delete/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        
        if(!id){
           return res.status(400).json({success: false, message: "id is not found",})
        }
       await deleteMediaToCloudinary(id);
       return res.status(200).json({success: true, message: 'deleted successfully'})

    }catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Error deleting files",})
    }
})
module.exports = router;
