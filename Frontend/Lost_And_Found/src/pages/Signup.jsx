import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    roll_no: "",
    email: "",
    password: "",
    phone: "",
    department: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(res.data.message);
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">Signup</h2>

        <form onSubmit={handleSignup} className="space-y-3">
          <input name="full_name" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="roll_no" placeholder="Roll No" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="phone" placeholder="Phone (optional)" onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="department" placeholder="Department" onChange={handleChange} className="w-full p-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;