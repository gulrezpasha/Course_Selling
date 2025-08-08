import {User} from "../models/user.model.js";
import bcrypt from 'bcrypt';
import {z} from 'zod';
import config from "../config.js";
import jwt from 'jsonwebtoken';

import { Admin } from "../models/admin.model.js";

export const signup=async (req,res) => {
    const {firstName,lastName,email,password}=req.body;


// we have to apply zod for authentication on server side
const adminSchema =z.object({
    firstName:z.string().min(3,{message:"firstName must atleast 3 char long"}),
    lastName:z.string().min(3,{message:"lastName must atleast 3 char long"}),
    email:z.string().email(),
    password:z.string().min(6,{message:"password must atleast 6 char long"}),
});

const validateData=adminSchema.safeParse(req.body);
if(!validateData.success){
    res.status(401).json({errors:validateData.error.issues.map(err=>err.message)});
}

    // makin password strong using hashing conccept

    const hashedpassword=await bcrypt.hash(password,10);
    try {
        const existingUser= await Admin.findOne({email:email});
        if(existingUser){
           return res.status(201).json({errors:"User already exist"});
        }
        const newAdmin=new Admin({firstName,lastName,email,password:hashedpassword});
        await newAdmin.save();
        res.status(201).json({message:"signup succeed",newAdmin});
    } catch (error) {
        res.status(500).json({errors:"error in signup"});
        console.log("error in signup",error);
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const admin=await Admin.findOne({email:email});
        const ispasswordcorrect=await bcrypt.compare(password,admin.password);

        if (!admin || !ispasswordcorrect){
           return  res.status(403).json({errors:"Invalid Credentials"});
        }
const token=jwt.sign({
    id:admin._id,
    
},config.JWT_ADMIN_PASSWORD,
{expiresIn:"1D"});
const cookieOptions={
    expires:new Date(Date.now()+24*60*1000),  // 1 day
    httpOnly:true, // can't be accessed via js directly
    secure:process.env.NODE_ENV==="production", // true for https only
    sameSite:"Strict" // CSRF attacks
};
res.cookie("jwt",token);
        res.status(201).json({message:"login suuccessfull",admin,token});
    } catch (error) {
        res.status(403).json({errors:"error in login"})
        console.log("error in login",error);
    }
}

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ errors: "please login first" });
    }

    // Optionally, you can verify the token here if needed
    // const token = authHeader.split(" ")[1];

    // Clear cookie anyway if you use cookies for login session
    res.clearCookie("jwt");
    res.status(201).json({ message: "log Out successfully" });
  } catch (error) {
    res.status(403).json({ errors: "error in logout" });
    console.log("error in logout", error);
  }
};



