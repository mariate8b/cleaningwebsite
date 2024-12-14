import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/ConfirmationPage";
import DropdownMenu from './components/DropdownMenu.jsx'; 
import AboutUs from "./pages/AboutUs";
 // Correct import path
import './index.css';

function App() {
  return (
    <Router>
      <div>
        {/* Include DropdownMenu */}
        <DropdownMenu />

        {/* Routes for your app */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
