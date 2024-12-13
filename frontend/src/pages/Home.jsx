import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white text-center p-8">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Our Cleaning Service</h1>
      <p className="text-green-500 mt-4">Serving the Dallas Metroplex Area</p>
      <Link to="/booking">
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Book a Cleaning
        </button>
      </Link>
    </div>
  );
};

export default Home;