import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

const protectRoute = async (req,res,next) =>{
    try{
        const token= req.cookies.jwt;                                     //get the token from cookies like this it not work first in server.js import the cookie parser
        if(!token){
            return  res.status(401).json({error: "Unauthorized -No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)    //we signin the token using the secret code now  we decode or verify the token using same secret key

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")                //why this means in data base fetching id from usermodel and 
                                                                             //decoded.userId why means we signin the token using userid and secret key (refer generateToken.js)
        if(!user){
                 return res.status(404).json({ error: "User not found"})
        }                                                               
        req.user = user      //now in request has user field which has authenticated  user ,we can access
        
        next()   //the next function why means in message.routes.js after protectroute we call the function sendMessage this continues until we return a response


    }catch(error){
        console.log("error in protect Route middleware: ",error.message)
        res.status(500).json({ error: "Internal server error"});
    }
}

export default protectRoute;