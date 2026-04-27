import axios from "axios";

import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
const API_URL = import.meta.env.VITE_API_URL;
function Login() {
  const navigate = useNavigate();
  const isLoggedin = useSelector(state=>state.auth.isLoggedin);
  if(!isLoggedin){
    <Navigate to='' replace/>
  }else{
    <Navigate to='/home' replace/>
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      // Since axios only comes here for 200-299
      const user = response.data.user;
      const token = response.data.token;
      if (user && token) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token)
        dispatch(login(user))
        navigate("/home");
        
      } else {
        alert("Login failed. No user data received.");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p>Dont Have an Account? Create one <a href="/signup" className=" hover:text-blue-700 transition duration-300" >Sign-up</a></p>
      </div>
    </div>
  );
}

export default Login;