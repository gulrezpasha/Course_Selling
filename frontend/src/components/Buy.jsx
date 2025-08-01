import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Buy() {
  const {courseId}=useParams();
  const[loading,setloading]=useState(false);
  const navigate=useNavigate();


  const token = localStorage.getItem("user");


console.log("Token:", token);

const handlePurchase = async () => {
  if (!token) {
    toast.error("Please login to purchase the course");
    return;
  }

  try {
    setloading(true);
    const { data } = await axios.post(
      `http://localhost:4001/api/v1/course/buyCourse/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    toast.success(data.message || "Course purchased successfully!");
    navigate("/purchases");
  }  catch (error) {
  if (error?.response?.status === 400) {
    toast.error("You have already purchased this course");
     navigate("/purchases");
  } else if (error?.response?.status === 401) {
    localStorage.clear(); // Clear invalid/stale token
    toast.error("Session expired. Please login again.");
    navigate("/login");
  } else {
    toast.error(error?.response?.data?.errors || "Something went wrong");
  }
} finally {
  setloading(false);
}
};



  return (
    <div className='flex h-screen items-center justify-center'>
      <button className='bg-orange-500 text-white py-2 px-4 rounded-md hover::bg-orange-800 duration-300' onClick={handlePurchase} disabled={loading} > 
        {loading ? "processing..." : "Buy Now"}
      </button>
    </div>
  )
}

export default Buy




