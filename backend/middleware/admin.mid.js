import jwt from "jsonwebtoken";
import config from "../config.js";

function adminMiddleware(req,res,next){

const authHeader=req.headers.authorization;


if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(403).json({errors:"No token provided"});
}
const token=authHeader.split(" ")[1];

try {
   const decoded=jwt.verify(token,config.JWT_ADMIN_PASSWORD);
   
   req.adminId=decoded.id;
   next();
} catch (error) {
    res.status(403).json({errors:"Invalid token "});
    console.log("Invalid token or expired token",error);
}

}
export default adminMiddleware;