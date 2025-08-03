import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import Courses from './components/courses'
import Purchases from './components/purchases'
import Buy from './components/buy'
import AdminSignup from './admin/AdminSignup'
import Dashboard from './admin/Dashboard'
import AdminLogin from './admin/AdminLogin'
import CourseCreate from './admin/CourseCreate'
import UpdateCourse from './admin/UpdateCourse'
import OurCourses from './admin/OurCourses'

function App() {

const user=localStorage.getItem('user');
// const admin=localStorage.getItem('admin');
const isAdminLoggedIn = Boolean(localStorage.getItem("admin"));

console.log("admin value:", localStorage.getItem("admin"));

  return (
    <div>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/login"element={<Login/>}/>

        {/* other routers */}

          <Route path="/courses"element={<Courses/>}/>
        <Route path="/buy/:courseId"element={<Buy/>}/>
        <Route path="/purchases"element={user? <Purchases/>:<Navigate to={'/login'}/>}/>



        {/* Admin routes */}

        <Route path='/admin/signup' element={<AdminSignup/>}></Route>
        <Route path='/admin/login' element={<AdminLogin/>}></Route>
        <Route path='/admin/dashboard' element={isAdminLoggedIn? <Dashboard/>:<Navigate to={'/admin/login'}/>}></Route>
        <Route path='/admin/create_course' element={<CourseCreate/>}></Route>
        <Route path='/admin/update_course/:id' element={<UpdateCourse/>}></Route>
        <Route path='/admin/our_courses' element={<OurCourses/>}></Route>

      </Routes>
       <Toaster />
    </div>
  )
}

export default App

