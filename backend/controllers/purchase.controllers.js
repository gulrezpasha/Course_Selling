import { Purchase } from "../models/purchase.model.js";

export const purchases = async (req, res) => {
  try {
    const userId = req.user.id; // userMiddleware sets req.user

    const purchasedCourses = await Purchase.find({ userId })
      .populate("courseId", "title description price image.url"); // populate with course fields

    res.json({
      success: true,
      purchased: purchasedCourses.map(p => p.courseId), // only course data
    });
  } catch (error) {
    console.error("❌ Error fetching purchases:", error);
    res.status(500).json({ success: false, message: "Error fetching purchases" });
  }
};
