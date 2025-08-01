import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';

function Purchases() {
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");
  
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch token
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, []);

  // Fetch purchased courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("user");
        const response = await axios.get("http://localhost:4001/api/v1/user/purchases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPurchase(response.data.courseData);
        setLoading(false);
      } catch (error) {
        
        setLoading(false);
        toast.error(error?.response?.data?.message || "Error in course fetching");
      }
    };
    fetchCourses();
  }, []);

  // Handle logout
   const handleLogOut = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
  //  setIsLoggedIn(false);
   toast.success("Logged out successfully");
   navigate("/login");
 };
 


 

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
   
      <div className="flex min-h-screen bg-gray-100">
      <div className={`bg-white border-r shadow-md w-64 p-4 fixed md:relative z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-6 text-blue-800">SkillUp</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="hover:text-orange-600 flex items-center"><RiHome2Fill className="mr-2" /> Home</Link>
          <Link to="/courses" className="hover:text-orange-600 flex items-center"><FaDiscourse className="mr-2" /> Courses</Link>
          <Link to="/purchases" className="text-orange-600 font-semibold flex items-center"><FaDownload className="mr-2" /> Purchases</Link>
          <Link to="/profile" className="hover:text-orange-600 flex items-center"><IoMdSettings className="mr-2" /> Profile</Link>
          <button onClick={handleLogOut} className="text-red-600 hover:underline flex items-center"><IoLogOut className="mr-2" /> Logout</button>
        </nav>
      </div>

      <div className="flex-1 md:ml-40 p-6">
        <button onClick={toggleSidebar} className="md:hidden mb-4 bg-orange-500 text-white px-3 py-1 rounded">
          {isSidebarOpen ? <HiX /> : <HiMenu />}
        </button>

        <h1 className="text-3xl font-bold mb-6">Your Purchased Courses</h1>

        {/* {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>} */}

        {loading ? (
          <p>Loading courses...</p>
        ) : purchase.length === 0 ? (
          <p>You have not purchased any courses yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* {purchase.map((course) => (
              <div key={course._id} className="bg-white shadow-lg rounded-md p-4 border border-gray-200">
                <img src={course.image?.url || "https://via.placeholder.com/200"} alt={course.title} className="w-full h-40 object-cover rounded" />
                <h2 className="text-lg font-semibold mt-2">{course.title}</h2>
                <p className="text-sm text-gray-600">{course.description.slice(0, 60)}...</p>
                <p className="text-blue-600 font-bold mt-2">₹{course.price}</p>
              </div>
            ))} */}

            {purchase.map((course) => (
  <div
    key={course._id}
    className="bg-white shadow-lg rounded-md p-4 border border-gray-200 flex flex-col justify-between"
  >
    <div>
      <img
        src={course.image?.url || "https://via.placeholder.com/200"}
        alt={course.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{course.title}</h2>
      <p className="text-sm text-gray-600">
        {course.description.slice(0, 60)}...
      </p>
      <p className="text-blue-600 font-bold mt-2">₹{course.price}</p>
    </div>

    {/* Orange View Button */}
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

export default Purchases;




