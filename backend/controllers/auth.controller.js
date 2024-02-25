import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login=async (req,res)=>{
    try{
         const {username,password} = req.body;

         const user = await User.findOne({username});
         const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")    
                                                                                                             //this will compare the db password and the password from request body ,
                                                                                                             //  if the is not existing means there is no pwd in the db so it then compare to empty string then only it don't throw error 
                                                                                                                  //ispasswordcorrect variable has either true or false
         if(!user ||  !isPasswordCorrect)   {
            return res.status(400).json({error: "Invalid username or password"});
         }                                                                       
         
         generateTokenAndSetCookie(user._id, res);

         res.status(200).json({
            _id:user._id,
            fullname:user.fullname,
            username:user.username,
            profilePic:user.profilePic,
         });


                                                                                                                  
    }
    catch(error){
        console.log("Error in login controller",error.message)
        res.status(500).json({error:"Internal server error"})

    }
  

}

export const signup=async (req,res)=>{
    try{
        const {fullname,username,password,confirmPassword,gender}=req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Password don't match"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
      

      //Hash password here
      const salt = await bcrypt.genSalt(10);               
      const hashedPassword= await bcrypt.hash(password,salt);                       //the higher it is more secure if 50 long time to generate
      //https://avatar-placeholder.iran.liara.run/

      const boyProfilePic= `https://avatar.iran.liara.run/public/boy?username=${username}`
      const girlProfilePic= `https://avatar.iran.liara.run/public/girl?username=${username}`

      const newUser = new User({                     
        fullname,
        username,
        password:hashedPassword,
        gender,
        profilePic:gender === "male" ?boyProfilePic :girlProfilePic
      })
      
    if(newUser){
     await   generateTokenAndSetCookie(newUser._id,res);
       await newUser.save();

       res.status(201).json({
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        profilePic:newUser.profilePic
      })
    }
    else{
        res.status(400).json({ error:"Invalid user data"});
    }
}

    catch(error){
        console.log("Error in signup conteroller",error.message)
        res.status(500).json({error:"Internal server error"})

    }
}    

export const logout=(req,res)=>{
    try{
        res.cookie("jwt"," ",{ maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});

    }catch(error){
        console.log("Error in signup conteroller",error.message)
        res.status(500).json({error:"Internal server error"})


    }
}