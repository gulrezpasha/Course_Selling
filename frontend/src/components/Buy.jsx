
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {BASE_URL} from '../utils/utils.js'

function Buy() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const navigate = useNavigate();
  // const token = localStorage.getItem("user");
 


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/v1/course/${courseId}`
        );
        

        setCourse(data.course);
        setLoading(false);
      } catch (error) {
        toast.error("Course not found!",error);
        navigate("/");
      }
    };
    fetchCourse();
  }, [courseId, navigate]);

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/course/buyCourse/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success(data.message || "Course purchased successfully!");
      navigate("/purchases");
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error("You have already purchased this course");
      } else if (error?.response?.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.errors || "Something went wrong");
      }
    }
  };
const handleDemoPurchase = async (courseId) => {
  console.log("Course ID to purchase:", courseId);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    await axios.post(
      `${BASE_URL}/api/v1/course/buyCourse/${courseId}`,
      { demo: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Demo purchase successful!");
    navigate("/purchases"); // Navigate to purchases page on success

  } catch (error) {
    console.error("Error purchasing course:", error);

    if (error.response?.status === 400) {
      toast.error(error.response.data.message || "Course already purchased");
      setTimeout(() => {
        navigate("/purchases"); // Auto redirect after showing error toast
      }, 1500);
    } else {
      toast.error(error.response?.data?.message || "Purchase failed");
    }
  }
};



  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading course...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-6">
      <div className="bg-white shadow-xl rounded-xl max-w-xl w-full p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="mb-6">
          <span className="text-xl font-semibold text-orange-600">
            ₹{course.price}
          </span>
          <span className="text-sm text-gray-500 ml-2">one-time payment</span>
        </div>

        {!demoMode && (
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              style={{ layout: "horizontal", color: "gold", shape: "rect" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: course.price.toString() } }],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                if (details.status === "COMPLETED") {
                  toast.success("✅ Payment successful!");
                  handlePurchase();
                } else {
                  toast.error("❌ Payment failed.");
                }
              }}
              onError={(err) => {
                toast.error("❌ Payment error occurred");
                console.error(err);
              }}
            />
          </PayPalScriptProvider>
        )}

        {demoMode && (
          
<button
  onClick={() => handleDemoPurchase(course._id)}  // <-- pass course._id explicitly
  disabled={loading}
  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition"
>
  {loading ? "Processing..." : "Demo Purchase (Free)"}
</button>



        )}

        <button
          onClick={() => setDemoMode(!demoMode)}
          className="mt-6 text-blue-600 hover:underline"
        >
          {demoMode
            ? "Switch to Real PayPal Payment"
            : "Switch to Demo Purchase (No Payment)"}
        </button>
      </div>
    </div>
  );
}

export default Buy;







