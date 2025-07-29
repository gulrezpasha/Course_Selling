import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous error

    try {
      const response = await axios.post('http://localhost:4001/api/v1/user/login', formData);
      console.log("Login Success:", response.data);
      toast.success("Login Success");
      localStorage.setItem("user",JSON.stringify(response.data.token));

      // You can redirect here (e.g. to dashboard)
      // navigate("/dashboard");
      navigate('/');
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.errors || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen text-white flex flex-col">
      
      {/* Top Navbar */}
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

      {/* Centered Login Form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold text-orange-400 mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-400 mb-6 text-center">Login to your SkillUp account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Error message shown above button */}
            {errorMsg && (
              <p className="text-red-500 text-sm text-center font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-2 px-4 rounded-full font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;


