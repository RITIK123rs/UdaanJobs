const jwt= require("jsonwebtoken");
const dotenv= require("dotenv");
require("dotenv").config();

const auth= (userType)=>(req,res,next)=>{

    try{
        // console.log("protected route");
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).json("not Token");
        const decode= jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) return res.status(401).json("expired/invalid");
        // console.log(decode);
        if(decode.userType!==userType && decode.userType!=="admin") return res.status(400).json("Not Authorized");
        req.user=decode;
        next();
    }
    catch(error){
        return res.status(500).json("protected route error :-",error);
    }
};


module.exports=auth;