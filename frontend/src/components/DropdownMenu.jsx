import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <div className="relative inline-block text-left">
      {/* Button that toggles the dropdown */}
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-blue-600 text-white shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        Navigate
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {/* Home Link */}
            <Link
              to="/"
              className="text-white block px-4 py-2 text-sm hover:bg-blue-700 font-bold"
              role="menuitem"
            >
              Home
            </Link>
            {/* Booking Link */}
            <Link
              to="/booking"
              className="text-white block px-4 py-2 text-sm hover:bg-blue-700 font-bold"
              role="menuitem"
            >
              Booking
            </Link>
            {/* Payment Link */}
            <Link
              to="/payment"
              className="text-white block px-4 py-2 text-sm hover:bg-blue-700 font-bold"
              role="menuitem"
            >
              Payment
            </Link>
            {/* Confirmation Link */}
            <Link
              to="/confirmation"
              className="text-white block px-4 py-2 text-sm hover:bg-blue-700 font-bold"
              role="menuitem"
            >
              Confirmation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

