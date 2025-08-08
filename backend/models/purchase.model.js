import mongoose from "mongoose";
const purchaseSchema=new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

});

export const Purchase=mongoose.model("Purchase",purchaseSchema); 


