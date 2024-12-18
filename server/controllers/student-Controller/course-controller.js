
const Course = require("../../models/Course")
const StudentCourses = require("../../models/studentCourses");

const getAllStudentViewCourses = async (req,res)=>{
    try {
        const coursesList = await Course.find({});
        if(coursesList.length ===0){
            return res.status(404).json({
                success: false,
                message:"NO course found",
                data:[]
            });
        }
        res.status(200).json({
            success: true,
            data:coursesList,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "some error occured!"
        })
    }
}
const getStudentViewCourseDetails = async (req,res)=>{
    try {
       const {id} = req.params;
       const courseDetails = await Course.findById(id);
       if(!courseDetails){
        return res.status(404).json({
            success: false,
            message:"course details not found",
            data:null,
        });
    }
        res.status(200).json({
        success: true,
        data:courseDetails,
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "some error occured!"
        })
    }
}


module.exports = {getAllStudentViewCourses, getStudentViewCourseDetails}