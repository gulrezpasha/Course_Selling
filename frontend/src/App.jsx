import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import Courses from './components/courses'
import Purchases from './components/purchases'
import Buy from './components/buy'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/login"element={<Login/>}/>

        {/* other routers */}

          <Route path="/courses"element={<Courses/>}/>
        <Route path="/buy/:courseId"element={<Buy/>}/>
        <Route path="/purchases"element={<Purchases/>}/>

      </Routes>
       <Toaster />
    </div>
  )
}

export default App

