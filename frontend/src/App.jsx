import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/ConfirmationPage";
import DropdownMenu from './components/DropdownMenu.jsx';  // Make sure it has the correct extension
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
