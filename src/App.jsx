import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import "../src/App.css"
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Explore from './pages/Explore';

export default function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/explore' element={<Explore />} />
     </Routes>
    </>
  )
}