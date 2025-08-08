
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/utils';

function Purchases() {
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

const token = localStorage.getItem("token");

const fetchPurchasedCourses = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/course/purchases`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPurchase(data.purchased || []);
    setLoading(false);
  } catch (error) {
    console.error("Purchase Fetch Error:", error);
    setLoading(false);
  }
};

useEffect(() => {
  if (!token) {
    toast.error("Please login first");
    navigate("/login");
  } else {
    fetchPurchasedCourses();
  }
}, [navigate]);

// Logout handler
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
<div
  className={`
    bg-gray-800 text-gray-100
    w-64 p-6
    fixed md:relative z-50
    shadow-lg
    transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
    rounded-r-lg
  `}
>
  <h2 className="text-3xl font-semibold mb-8 text-orange-400 tracking-wide">
    SkillUp
  </h2>
  <nav className="flex flex-col space-y-6">
    <Link
      to="/"
      className="flex items-center hover:text-orange-500"
    >
      <RiHome2Fill className="mr-3 text-xl" /> Home
    </Link>
    <Link
      to="/courses"
      className="flex items-center hover:text-orange-500"
    >
      <FaDiscourse className="mr-3 text-xl" /> Courses
    </Link>
    <Link
      to="/purchases"
      className="flex items-center hover:text-orange-500"
    >
      <FaDownload className="mr-3 text-xl" /> Purchases
    </Link>
    <Link
      to="/profile"
      className="flex items-center hover:text-orange-500"
    >
      <IoMdSettings className="mr-3 text-xl" /> Profile
    </Link>
    <button
      onClick={handleLogOut}
      className="flex items-center hover:text-red-500"
    >
      <IoLogOut className="mr-3 text-xl" /> Logout
    </button>
  </nav>
</div>

      {/* Main content */}
      <div className="flex-1 md:ml-44 p-6">
        {/* Mobile sidebar toggle */}
        <button onClick={toggleSidebar} className="md:hidden mb-4 bg-orange-500 text-white px-3 py-1 rounded">
          {isSidebarOpen ? <HiX /> : <HiMenu />}
        </button>

        <h1 className="text-3xl font-bold mb-6">Your Purchased Courses</h1>

        {loading ? (
          <p>Loading courses...</p>
        ) : purchase.length === 0 ? (
          <p>You have not purchased any courses yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchase.map((course) => (
              <div
                key={course._id || Math.random()}
                className="bg-gray-900 shadow-lg rounded-md p-4 border border-gray-200 flex flex-col justify-between text-white"
              > 
                <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg" >  
                  <img
                    src={course?.image?.url || "https://via.placeholder.com/200"}
                    alt={course?.title || "Course Image"}
                    className="w-40 h-40 object-coverrounded"
                  />
                  <h2 className="text-lg font-semibold mt-2">{course?.title || "Untitled Course"}</h2>
                  <p className="text-sm text-gray-300">
                    {course?.description ? course.description.slice(0, 60) + "..." : "No description"}
                  </p>
                  <p className="text-blue-600 font-bold mt-2">₹{course?.price ?? "N/A"}</p>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/course/${course._id}`}
                    className="inline-block w-50 bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded-md transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchases





