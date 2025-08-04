import {User} from "../models/user.model.js";
import bcrypt from 'bcrypt';
import {z} from 'zod';
import config from "../config.js";
import jwt from 'jsonwebtoken';
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";

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
           return res.status(400).json({errors:"User already exist"});
        }
        const newUser=new User({firstName,lastName,email,password:hashedpassword});
        await newUser.save();
        res.status(201).json({message:"signup succeed",newUser});
    } catch (error) {
        res.status(500).json({errors:"error in signup"});
        console.log("error in signup",error);
    }
}

// export const login=async(req,res)=>{
//     const {email,password}=req.body;
//     try {
//         const user=await User.findOne({email:email});
//         const ispasswordcorrect=await bcrypt.compare(password,user.password);

//         if (!user || !ispasswordcorrect){
//            return  res.status(403).json({errors:"Invalid Credentials"});
//         }
// const token=jwt.sign({
//     id:user._id,
    
// },config.JWT_USER_PASSWORD,
// {expiresIn:"1D"});
// const cookieOptions={
//     expires:new Date(Date.now()+24*60*1000),  // 1 day
//     httpOnly:true, // can't be accessed via js directly
//     secure:process.env.NODE_ENV==="production", // true for https only
//     sameSite:"Strict" // CSRF attacks
// };
// res.cookie("jwt",token);
//         res.status(201).json({message:"login suuccessfull",user,token});
//     } catch (error) {
//         res.status(403).json({errors:"Error in login"})
//         console.log("error in login",error);
//     }
// }


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      config.JWT_USER_PASSWORD,
      { expiresIn: "1d" }
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod HTTPS
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(201).json({ message: "login successful", user, token });
  } catch (error) {
    res.status(403).json({ errors: "Error in login" });
    console.log("error in login", error);
  }
};



// export const logout=async(req,res)=>{
//     try {
//         if(!req.cookies.jwt){
//      return res.status(403).json({errors:"please login first"});
//         }
//         res.clearCookie("jwt");
//         res.status(201).json({message:"log Out successfully"});
//     } catch (error) {
//         res.status(403).json({errors:"error in logout"});
//         console.log("error in logout",error);
//     }
// }


export const logout = async (req, res) => {
  try {
    if (!req.cookies?.jwt) {
      return res.status(403).json({ errors: "Please login first" });
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout", error);
    res.status(500).json({ errors: "Error in logout" });
  }
};


// export const purchases=async (req,res)=>{
//     const userId=req.userId;
//     try {
//         const purchased=await Purchase.find({userId});
//         let purchasedCourseId=[];
//         for(let i=0; i<purchased.length; i++){
//             purchasedCourseId.push(purchased[i].courseId);
//         }
//         const courseData=await Course.find({
//             _id:{$in:purchasedCourseId}
//         });
//         res.status(200).json({purchased,courseData});
//     } catch (error) {
//         console.log("Error fetching purchases:", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//     }
// }

// export const purchases = async (req, res) => {
//   const userId = req.userId;

//   try {
//     // 1. Get all purchases by the logged-in user
//     const purchased = await Purchase.find({ userId }); // or { userId: userId }

//     // 2. Extract courseId from each purchase
//     const purchasedCourseIds = purchased.map(p => p.courseId);

//     // 3. Find courses using those courseIds
//     const courseData = await Course.find({ _id: { $in: purchasedCourseIds } });

//     // 4. Send back the data
//     res.status(200).json({ purchased, courseData });
//   } catch (error) {
//     console.error("Error fetching purchases:", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };



// export const purchases = async (req, res) => {
//   try {
//     const userId = req.user._id; // this should come from JWT middleware
//     const { courseId } = req.body;

//     if (!courseId) {
//       return res.status(400).json({ success: false, message: "Course ID is required" });
//     }

//     const alreadyPurchased = await Purchase.findOne({ userId, courseId });
//     if (alreadyPurchased) {
//       return res.status(200).json({ success: true, message: "Course already purchased" });
//     }

//     const purchase = await Purchase.create({
//       userId,
//       courseId,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Purchase successful",
//       purchase,
//     });
//   } catch (error) {
//     console.error("Purchase error:", error);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };


// export const purchases = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // Find all purchases for this user and populate course details
//     const purchases = await Purchase.find({ userId })
//       .populate('courseId')  // Populate course details instead of just ID
//       .exec();

//     res.status(200).json({
//       success: true,
//       courseData: purchases.map(purchase => purchase.courseId), // send array of courses
//     });
//   } catch (error) {
//     console.error("Purchase fetch error:", error);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };


export const purchases = async (req, res) => {
  try {
    const userId = req.user._id;

    const purchases = await Purchase.find({ userId })
      .populate('courseId')
      .exec();

    console.log("Fetched purchases with populated courses:", purchases);

    const courseData = purchases
      .map(purchase => purchase.courseId)
      .filter(course => course != null);

    res.status(200).json({
      success: true,
      courseData,
    });
  } catch (error) {
    console.error("Purchase fetch error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};





