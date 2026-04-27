import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, isLoggedin } = useSelector(state=>state.auth);
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/", { replace: true});
  };

  const navElements = [
    {
      name : "Home",
      to  : "/home",
    },
    {
      name : "Report Item",
      to  : "/report",
    },
    {
      name : "My posts",
      to : "my-posts",
    },
  ];

  userData?.role==='STAFF' ? navElements.push({
      name : "Requests",
      to  : "/requests",
    },{
      name : "Claims",
      to  : "/claim-requests",
    }) : null;

  return (
    <nav className="bg-gray-900 text-white shadow-lg relative">
      <div className="max-w-screen mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Lost & Found Logo" className="h-20 w-auto" />
          <h1 className="text-xl md:text-2xl font-bold text-indigo-400">
            Lost And Found
          </h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 font-medium items-center">
          {
            navElements.map( (element ) => {
              return(
                <NavLink to={element.to} className={({isActive}) =>
                  `px-3 py-2 font-medium transition-all duration-300 transform text-white
                  ${
                    isActive
                      ? "text-indigo-400 scale-110"
                      : "text-amber-50 hover:text-indigo-300 hover:scale-110"
                  }`
                  } key={element.name}>
                  {element.name}
                </NavLink>
              )
            })
          }
      
          {isLoggedin
          ? <button
              onClick={handleLogout}
              className="px-3 py-2 font-medium transition-all duration-300 transform text-amber-50 hover:text-indigo-300 hover:scale-110"
              >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          : null}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(true)} className="text-white hover:text-indigo-400 focus:outline-none transition">
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        {/* Dark Overlay */}
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)}></div>
        
        {/* Sidebar Content */}
        <div className="absolute right-0 top-0 h-full w-64 bg-gray-900 shadow-xl p-6 flex flex-col">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-indigo-400 focus:outline-none transition">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>
          
          <div className="flex flex-col gap-6 font-medium">
            {
              navElements.map( (element ) => (
                <NavLink to={element.to} onClick={() => setIsOpen(false)} className={({isActive}) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-300 transform text-white
                  ${
                    isActive
                      ? "bg-indigo-600 shadow-md scale-105"
                      : "text-amber-50 hover:bg-gray-800 hover:text-indigo-300"
                  }`
                  } key={element.name}>
                  {element.name}
                </NavLink>
              ))
            }
        
            {isLoggedin
            ? <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="px-4 py-2 mt-4 text-left rounded-lg font-medium transition-all duration-300 transform text-amber-50 hover:bg-red-600/80 hover:text-white"
                >
                <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
              </button>
            : null}
          </div>
        </div>
      </div>

    </nav>
  );
}