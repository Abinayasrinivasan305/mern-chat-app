import User from "../models/usermodel.js"

export const getUserForSidebar = async(req,res)=>{
    try{

        const loggedInUSerId = req.user._id
        const filterUsers = await User.find({_id: { $ne: loggedInUSerId } }).select("-password");   //find every user in the db but the one not equal ($ne) to loggedinuserid without pwd field

        res.status(200).json(filterUsers);


    }
    catch(error){
        console.log("Error in getUserForSidebar:",error.message)
        res.status(500).json({error: "Internal Server error"})
    }
}