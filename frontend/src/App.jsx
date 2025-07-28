import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/login"element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App

