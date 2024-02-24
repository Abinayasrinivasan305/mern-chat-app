import mongoose, { mongo } from "mongoose";

const messageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,                           //this is the reference (this is the id which inside the user mode)
        ref:'User',
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required: true
    }
    //the message field has createdAt,updatedAt  so we use timestamp :true mongoose automatically createdAt,updatedAt
}, {timestamps: true});

const Message=mongoose.model('Message',messageSchema);
export default Message;