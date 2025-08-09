import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import courseRoute from './routes/course.routes.js';
import userRoute from './routes/user.routes.js';
import adminRoute from './routes/admin.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import paymentRoutes from "./routes/paymentRoutes.js";
const app=express();
dotenv.config();
const port=process.env.PORT||3000;
const DB_URI=process.env.MONGODB_URI;

try {
  await  mongoose.connect(DB_URI)
   console.log("Db connect to mongodb"); 
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
// app.use(cors({
//      origin:process.env.FRONTEND_URL,
//      credentials:true,
//      methods:["GET","POST","DELETE","PUT"],
//      allowedHeaders:["Content-Type","Authorization"],
     
// }))

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://course-selling-ochre.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));





app.use("/api/v1/course",courseRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);
app.use("/api/paypal", paymentRoutes);

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.api_secret,
    });

app.listen(port,()=>{
    console.log(`running on port ${port}`);
})





