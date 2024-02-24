import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({                 //two arrays participants and messages    
    participants:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'                                                     //referece to user
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message',                                            //reference to message
            default:[]                                              //first  conversation is empty next  while starting conversation the message id pushed into an array so default empty

        }
    ]
},{timestamps:true});

const Conversation = mongoose.model('Conversation',conversationSchema);

export default Conversation;