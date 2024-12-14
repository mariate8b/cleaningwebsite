import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
    const handleButtonClick = (e) => {
      e.target.classList.add("animate-bounce");
      setTimeout(() => e.target.classList.remove("animate-bounce"), 500);
    };
  return (
    <div className="p-8 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-600">About Us</h2>
      <p className="mt-4 text-lg text-gray-700">
        At our cleaning company, we are committed to providing top-notch cleaning services tailored to your
        needs. Serving the Dallas Metroplex, we pride ourselves on reliability, professionalism, and customer
        satisfaction.
      </p>
      <p className="mt-4 text-lg text-gray-700">
        Whether it’s a small apartment or a large house, our team is equipped to handle it all. We value your
        time and trust, ensuring a spotless experience every time.
      </p>
      <Link to="/booking">
        <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Book a Cleaning Now
        </button>
      </Link>
    </div>
  );
};

export default AboutUs;
