const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    number: Number,
    age: Number,
    role:{
        type:String,
        default: "user"
    }
})

module.exports = mongoose.model("User", UserShema)
