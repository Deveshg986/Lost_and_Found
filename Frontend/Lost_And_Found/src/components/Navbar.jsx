import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import React from "react";
export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
  <div className="max-w-screen mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img src={logo} alt="Lost & Found Logo" className="h-20 w-auto" />
      <h1 className="text-2xl font-bold text-indigo-400">
        Lost And Found
      </h1>
    </div>
    <div className="hidden md:flex gap-8 font-medium">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `px-3 py-2 font-medium transition-all duration-300 transform ${
            isActive
              ? "text-indigo-400 scale-110"
              : "text-amber-50 hover:text-indigo-300 hover:scale-110"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/report"
          className={({ isActive }) =>
          `px-3 py-2 font-medium transition-all duration-300 transform ${
            isActive
              ? "text-indigo-400 scale-110"
              : "text-amber-50 hover:text-indigo-300 hover:scale-110"
        }`
      }
      >
        Report Found Item
      </NavLink>

      <NavLink
        to="/lostitem"
        className={({ isActive }) =>
          `px-3 py-2 font-medium transition-all duration-300 transform ${
            isActive
              ? "text-indigo-400 scale-110"
              : "text-amber-50 hover:text-indigo-300 hover:scale-110"
          }`
        }
      >
        Lost Items
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `px-3 py-2 font-medium transition-all duration-300 transform ${
            isActive
              ? "text-indigo-400 scale-110"
              : "text-amber-50 hover:text-indigo-300 hover:scale-110"
          }`
        }
      >
        Contact
      </NavLink>
    </div>

  </div>
</nav>
  );
}
