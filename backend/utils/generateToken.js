import jwt from "jsonwebtoken";

const generateTokenAndSetCookie =async  (userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'                                                        //expires in 15days
    })

    res.cookie("jwt",token,{
        maxAge:15 * 24 * 60* 60 * 1000,                                   //15days 24hrs 60mins 60secs 1000ms
        httpOnly: true,                                        //prevent XSS attacks cross-site-scripting attacks(cannot access from js)
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"    //to make security either true or false in cookies correspond to development or production
                                                   //CSRF attacks cross-site request forgery attacks

    })


}
export default generateTokenAndSetCookie;