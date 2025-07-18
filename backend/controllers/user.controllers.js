import {User} from "../models/user.model.js";
import bcrypt from 'bcrypt';
import {z} from 'zod';
import config from "../config.js";
import jwt from 'jsonwebtoken';

export const signup=async (req,res) => {
    const {firstName,lastName,email,password}=req.body;


// we have to apply zod for authentication on server side
const userSchema =z.object({
    firstName:z.string().min(3,{message:"firstName must atleast 3 char long"}),
    lastName:z.string().min(3,{message:"lastName must atleast 3 char long"}),
    email:z.string().email(),
    password:z.string().min(6,{message:"password must atleast 6 char long"}),
});

const validateData=userSchema.safeParse(req.body);
if(!validateData.success){
    res.status(401).json({errors:validateData.error.issues.map(err=>err.message)});
}

    // makin password strong using hashing conccept

    const hashedpassword=await bcrypt.hash(password,10);
    try {
        const existingUser= await User.findOne({email:email});
        if(existingUser){
           return res.status(201).json({errors:"User already exist"});
        }
        const newUser=new User({firstName,lastName,email,password:hashedpassword});
        await newUser.save();
        res.status(201).json({message:"signup succeed",newUser});
    } catch (error) {
        res.status(500).json({errors:"error in signup"});
        console.log("error in signup",error);
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email:email});
        const ispasswordcorrect=await bcrypt.compare(password,user.password);

        if (!user || !ispasswordcorrect){
           return  res.status(403).json({errors:"Invalid Credentials"});
        }
const token=jwt.sign({
    id:user._id,
    
},config.JWT_USER_PASSWORD);
res.cookie("jwt",token);
        res.status(201).json({message:"login suuccessfull",user,token});
    } catch (error) {
        res.status(403).json({errors:"error in login"})
        console.log("error in login",error);
    }
}