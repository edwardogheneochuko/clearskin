import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './components/landingpage/Home';
import Navbar from './components/Navbar';
import "../src/App.css"

export default function App() {
  return (
    <>
    <Navbar />
     <Routes>
        <Route path="/" element={<Home />} />
     </Routes>
    </>
  )
}