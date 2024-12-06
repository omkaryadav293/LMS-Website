

const express = require('express');


const authenticateMiddleware = require("../../middleware/auth-middleware") 

const router = express.Router();


router.get("/",authenticateMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        data:{
            user
        }
    })
});
module.exports = router
