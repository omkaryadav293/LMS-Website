const cloudinary = require('cloudinary').v2;
// const dotenv = require('dotenv');
// dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadMediaToCloudinary = async (filepath)=>{
    try{
        const result = await cloudinary.uploader.upload(filepath,{
            resource_type: "auto",
        })
        
            return result;
    }catch(err){
        console.log("clouduploaderr:",  err)
        throw new Error("can't upload it ")
    }
}

const deleteMediaToCloudinary = async(publicId)=>{
    try{
      await cloudinary.uploader.destroy(publicId);
    }catch(err){
        console.log("cloudelerr:",  err)
        throw new Error("deleting got in problem")
    }
};

module.exports = {uploadMediaToCloudinary, deleteMediaToCloudinary}