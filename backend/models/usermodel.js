import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]                               //used to set predefined values
    },
    profilePic:{
        type:String,
        default:""
    },
    //createdAt and updatedAt fields
},{timestamps:true})

const User=mongoose.model("User",userSchema);

export default User;