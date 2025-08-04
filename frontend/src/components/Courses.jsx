import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons
import logo from "../assets/logo.jpg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { BASE_URL } from "../utils/utils.js";

// function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

//   console.log("courses: ", courses);

//   // Check token
//   useEffect(() => {
//     const token = localStorage.getItem("user");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   // Fetch courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/course/courses`, {
//           withCredentials: true,
//         });
//         console.log(response.data.courses);
        
//         setCourses(response.data.course);
//         setLoading(false);
//       } catch (error) {
//         console.log("error in fetchCourses ", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // Logout
//  const handleLogOut = () => {
//    localStorage.removeItem('token');
//    localStorage.removeItem('user');
//    setIsLoggedIn(false);
//    toast.success("Logged out successfully");
//  };
 

//   // Toggle sidebar for mobile devices
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex">
//       {/* Hamburger menu button for mobile */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? <HiX /> : <HiMenu />} {/* Toggle menu icon */}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:static`}
//       >
//         <div className="flex items-center mb-10 mt-10 md:mt-0">
//           <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <a href="/" className="flex items-center">
//                 <RiHome2Fill className="mr-2" /> Home
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center text-blue-500">
//                 <FaDiscourse className="mr-2" /> Courses
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="/purchases" className="flex items-center">
//                 <FaDownload className="mr-2" /> Purchases
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center">
//                 <IoMdSettings className="mr-2" /> Settings
//               </a>
//             </li>
//             <li>
//               {isLoggedIn ? (
//                 <Link to={"/"}
                  
//                   className="flex items-center"
//                   onClick={handleLogOut}
//                 >
//                   <IoLogOut className="mr-2" /> Logout
//                 </Link>
//               ) : (
//                 <Link to={"/login"} className="flex items-center">
//                   <IoLogIn className="mr-2" /> Login
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="ml-0 md:ml-40 w-full bg-white p-10">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-xl font-bold">Courses</h1>
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Type here to search..."
//                 className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
//               />
//               <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
//                 <FiSearch className="text-xl text-gray-600" />
//               </button>
//             </div>

//             <FaCircleUser className="text-4xl text-blue-600" />
//           </div>
//         </header>

//         {/* Vertically Scrollable Courses Section */}
//         <div className="overflow-y-auto h-[75vh]">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : courses.length === 0 ? (
//             // Check if courses array is empty
//             <p className="text-center text-gray-500">
//               No course posted yet by admin
//             </p>
//           ) : (
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="border border-gray-200 rounded-lg p-4 shadow-sm"
//                 >
//                   <img
//                     src={course.image.url}
//                     alt={course.title}
//                     className="rounded mb-4"
//                   />
//                   <h2 className="font-bold text-lg mb-2">{course.title}</h2>
//                   <p className="text-gray-600 mb-4">
//                     {course.description.length > 100
//                       ? `${course.description.slice(0, 100)}...`
//                       : course.description}
//                   </p>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="font-bold text-xl">
//                       ₹{course.price}{" "}
//                       <span className="text-gray-500 line-through">5999</span>
//                     </span>
//                     <span className="text-green-600">20% off</span>
//                   </div>

//                   {/* Buy page */}
//                   <Link
//                     to={`/buy/${course._id}`} // Pass courseId in URL
//                     className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
//                   >
//                     Buy Now
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Courses;






// ... (same imports)
function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.course);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-700 shadow-lg w-64 p-6 z-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-center mb-10">
          <img src={logo} alt="Logo" className="w-14 h-14 rounded-full shadow" />
        </div>
        <nav>
          <ul className="space-y-5 text-white font-medium">
            <li>
              <a href="/" className=" flex items-center hover:text-orange-500">
                <RiHome2Fill className="mr-3 text-xl" /> Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-orange-600 font-bold">
                <FaDiscourse className="mr-3 text-xl" /> Courses
              </a>
            </li>
            <li>
              <a href="/purchases" className="flex items-center hover:text-orange-500">
                <FaDownload className="mr-3 text-xl" /> Purchases
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-orange-500">
                <IoMdSettings className="mr-3 text-xl" /> Settings
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/" onClick={handleLogOut} className="flex items-center hover:text-red-500">
                  <IoLogOut className="mr-3 text-xl" /> Logout
                </Link>
              ) : (
                <Link to="/login" className="flex items-center hover:text-green-600">
                  <IoLogIn className="mr-3 text-xl" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-48 bg-gradient-to-br from-gray-50 to-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">Explore Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex border rounded-full overflow-hidden shadow">
              <input
                type="text"
                placeholder="Search courses..."
                className="px-4 py-2 text-sm focus:outline-none"
              />
              <button className="bg-white px-4 py-2 text-gray-500 hover:text-gray-800">
                <FiSearch className="text-xl" />
              </button>
            </div>
            <FaCircleUser className="text-3xl text-blue-600" />
          </div>
        </div>

        {/* Courses Section */}
        <div className="overflow-y-auto max-h-[80vh]">
          {loading ? (
            <p className="text-center text-gray-500 text-lg">Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No courses available.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-900 border border-gray-300 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="w-40 h-40 object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-white truncate" title={course.title}>
                    {course.title}
                  </h2>
                  <p className="text-white text-sm mt-2 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div>
                      <span className="text-lg font-bold text-white">
                        ₹{course.price}
                      </span>
                      <span className="text-sm line-through text-gray-300 ml-2">₹5999</span>
                    </div>
                    <span className="text-green-600 text-sm font-medium">20% Off</span>
                  </div>
                  <Link
                    to={`/buy/${course._id}`}
                    className="mt-4 w-full bg-orange-500 text-white text-center py-2 rounded-md font-medium hover:bg-orange-600 transition duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;

