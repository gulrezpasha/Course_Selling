import express from 'express'
import { createCourse, deleteCourse, getCourse, updateCourse } from '../controllers/course.controllers.js';

const router= express.Router();

router.post("/create",createCourse);

router.put("/update/:courseId", updateCourse);

router.delete("/delete/:courseId",deleteCourse);

router.get("/courses",getCourse);

export default router;