const StudentCourses = require('../../models/studentCourses');

const getCoursesByStudentId = async(req,res)=>{
    try{
        const {studentId} = req.params;
        const studentBoughtCourses = await StudentCourses.findOne({
            userId : studentId
        });

           res.status(200).json({
            success : true,
            data: studentBoughtCourses.courses
           });
        

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            messate: "Some error occured"
        })
    }
}

module.exports = {getCoursesByStudentId};