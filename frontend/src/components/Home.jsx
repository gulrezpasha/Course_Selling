
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import React, { useState,useEffect } from 'react';
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from 'axios';
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/utils";

function Home() {
    const [courses, setCourses] = useState([]);
    const [isLoggedIn,setIsLoggedIn]=useState(false);


    useEffect(()=>{
      const token=localStorage.getItem('user');
      if(token){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    },[]);



const handleLogOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setIsLoggedIn(false);
  toast.success("Logged out successfully");
};

useEffect(() => {
    
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/course/courses`, {
        withCredentials: true,
      });
      console.log(response.data.course); // ✅ verify this in console
      setCourses(response.data.course);  // ✅ FIXED
    } catch (error) {
      console.log("error in fetching courses", error);
    }
  };
  fetchCourses();
}, []);


var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

    return (
        <div className="bg-gradient-to-r from-black to-blue-950 text-white min-h-screen">
            {/* Header */}
            <header className="w-full max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="SkillUp logo" className="w-10 h-10 rounded-full" />
                    <h1 className="text-2xl font-bold text-orange-400">SkillUp</h1>
                </div>
                <div className="flex gap-4">
                    {isLoggedIn ?(
                     <button onClick={handleLogOut}
                       className="border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                       >
                        Logout
                     </button>
                       
                    
                    ):(
                      <>
                      <Link
                        to="/login"
                        className="border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition duration-300"
                    >
                        Signup
                    </Link>
                      </>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-10 px-4">
                <h1 className="text-4xl font-semibold text-orange-400">SkillUp</h1>
                <p className="text-gray-400 mt-6 max-w-xl mx-auto">
                    Sharpen your skills with courses crafted by industry-leading experts.
                </p>
                <div className="flex justify-center gap-4 mt-6 flex-wrap">
                    <Link to={"/courses"} className="bg-green-900 text-white py-3 px-6 rounded font-semibold hover:bg-white hover:text-black transition duration-300">
                        Explore Courses
                    </Link>
                    <Link to={'https://www.youtube.com/results?search_query=a2z+dsa'} className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-900 hover:text-white transition duration-300">
                        Course Videos
                    </Link>
                </div>
            </section>
            <section className="w-full max-w-[1224px] mx-auto p-4">

             <Slider {...settings}>
  {courses.map((course) => {
    console.log(course.image);
    return (
      <div key={course._id} className='p-2'>
        <div className='relative flex-shrink-0  w-70 transition-transform duration-300 transform hover:scale-110'>
        <div className='bg-gray-900 rounded-lg overflow-hidden'>
          <img className='h-24 w-full object-contain' src={course.image.url} alt="" />
          <div className='p-3 text-center'>
            <h2 className='text-xl font-bold text-white'>{course.title}</h2>
            {/* <p>{course.description}</p> */}
            <button  className="mt-3 bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-purple-400 duration-300">Enroll Now</button>
          </div>
        </div>
      </div>
      </div>
    );
  })}
</Slider>

            </section>
           
            {/* Footer */}
            <footer >
                <div className="max-w-screen-xl mx-auto px-6 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    
                    {/* Left - Logo + Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2">
                            {/* <img src={logo} alt="SkillUp logo" className="w-10 h-10 rounded-full" /> */}
                            <h2 className="text-2xl  mt-9 font-bold text-orange-400">SkillUp</h2>
                        </div>
                        <div className="mt-2">
                            <p className="  mb-2">Follow us</p>
                            <div className="flex gap-4">
                                <a href="#"><FaFacebook className="text-2xl hover:text-blue-400 cursor-pointer" /></a>
                                <a href="#"><FaInstagram className="text-2xl hover:text-pink-400 cursor-pointer" /></a>
                                <a href="#"><FaXTwitter className="text-2xl hover:text-slate-400 cursor-pointer" /></a>
                            </div>
                        </div>
                    </div>

                    {/* Center - Connects */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mt-14 mb-1">Connects</h3>
                        <ul className="space-y-1 text-gray-400">
                            <li className="hover:text-white cursor-pointer">YouTube – SkillUp</li>
                            <li className="hover:text-white cursor-pointer">Telegram – SkillUp</li>
                            {/* <li className="hover:text-white cursor-pointer">GitHub – SkillUp</li> */}
                        </ul>
                    </div>

                    {/* Right - Legal */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mt-14 mb-1">Copyright © 2025</h3>
                        <ul className="space-y-1 text-gray-400">
                            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
                            {/* <li className="hover:text-white cursor-pointer">Privacy Policy</li> */}
                            <li className="hover:text-white cursor-pointer">Refund & Cancellations</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
