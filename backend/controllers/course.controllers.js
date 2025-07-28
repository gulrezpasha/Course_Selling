import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.model.js";

export const createCourse = async (req, res) => {
  const adminId=req.adminId;
  const { title, description, price } = req.body;

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No Files uploaded" });
    }

    const { image } = req.files;

    console.log("Received image:", image); // ✅ Debug

    const allowedFormats = ["image/png", "image/jpeg"];
    if (!allowedFormats.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ errors: "Invalid format. Only PNG and JPG allowed." });
    }

    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error uploading file to Cloudinary" });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      creatorId:adminId,
    };

    const course = await Course.create(courseData);

    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateCourse=async(req,res)=>{
    const {courseId}=req.params;
    const adminId=req.adminId;
    const {title,description,price,image}=req.body;
    try {
        const existingCourse = await Course.findById(courseId);
         const course= await Course.updateOne({
            _id:courseId,
            creatorId:adminId,
         },{
            title,
            description,
            price,
            image:{
               public_id:image?.public_id||existingCourse.image.public_id,
               url:image?.url||existingCourse.image.url,

            }
         });
         res.status(201).json({message:"course updated succesfully",course});
    } catch (error) {
        res.status(400).json({error:"error in course updating"});
        console.log("error in course updating",error);
    }
};


export const deleteCourse=async(req,res)=>{
    const {courseId}=req.params;
    const adminId=req.adminId;    // const {title,description, price, image}=req.body;

    try {
        const course=await Course.findOneAndDelete({
            _id:courseId,
            creatorId:adminId
        });
        if(!course){
            return res.status(404).json({errors:"cousre not found"});
        }
        res.status(201).json({message:"course deleted succesfully"});
    } catch (error) {
        res.status(400).json({errors:"error in course deleting"});
        console.log("error in course deleting",error);
        
    }
};


export const getCourse=async(req,res)=>{
    try {
        const course=await Course.find({});
        res.status(201).json({course});
    } catch (error) {
        res.status(404).json({errors:"error in getting course"});
        console.log("fail to get courses",error);
    }
};


export const courseDetails=async (req,res) => {
  const {courseId}=req.params;
    try {
        const course =await Course.findById(courseId);
        if(!course){
          res.status(201).json({errors:" cousre not found"});
        }
        res.status(201).json({course});
    } catch (error) {
      res.status(404).json({errors:"error in finding course"});
      console.log("error in cousre finding",error);
    }
};


export const buyCourse=async (req,res)=>{
   const userId = req.userId;

   const courseId = req.params.courseId;

    try {
       const course =await Course.findById(courseId);
       if(!course){
        return res.status(403).json({error:"Course not found"});
       }
       const existingPurchase=await Purchase.findOne({userId,courseId});
       if(existingPurchase){
        return res.status(201).json({error:"course is already purchased"});
       }
    const newPurchase= new Purchase({userId,courseId});
    await newPurchase.save();
    res.status(201).json({message:"course purchased successfully",newPurchase});
    } catch (error) {
      res.status(403).json({errors:"error in course buying"});
      console.log("error in course buying",error);
    }
};
