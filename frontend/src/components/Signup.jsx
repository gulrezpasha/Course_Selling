// import React from 'react'

// function Signup() {
//   return (
//     <div>
//       Signup
//     </div>
//   )
// }

// export default Signup

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    // You can now send data to backend API using axios.post()
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen text-white flex flex-col">
      
      {/* Top Bar with Logo and Buttons */}
      <div className="w-full max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SkillUp Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold text-orange-400">SkillUp</h1>
        </div>
        <div className="flex gap-4">
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
            Join Now
          </Link>
        </div>
      </div>

      {/* Centered Signup Form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-orange-400 mb-2 text-center">Welcome to SkillUp</h2>
          <p className="text-gray-400 mb-6 text-center">Just sign up to join us</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-2 px-4 rounded-full font-semibold"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

