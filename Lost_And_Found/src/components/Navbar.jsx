import { NavLink } from "react-router-dom";
import logo from "../assets/LAF_Logo.png";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <div className="flex items-center gap-2">
            <img src={logo} alt="Lost & Found Logo" className="h-15" />
        </div>
          <div>
            <h1 className="text-xl font-bold text-indigo-400">
                Lost And Found
            </h1>
          </div>
        </div>
        <div className="hidden md:flex space-x-8 font-medium">
        <NavLink 
        to="/" 
        className={({ isActive }) =>
            isActive ? "text-indigo-400" : "text-amber-50"
        }
        >
        Home
        </NavLink>
          <NavLink to="/report"  className={({isActive})=>
            isActive ? "text-indigo-400": "text-amber-50"
          }>
            Report Found Item
          </NavLink>
          <NavLink to="/lostitem" className={({isActive})=>
            isActive ? "text-indigo-400": "text-amber-50"
          }>
            Lost Items
          </NavLink>
          <NavLink to="/contact" className={({isActive})=>
            isActive ? "text-indigo-400": "text-amber-50"
          }>
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
