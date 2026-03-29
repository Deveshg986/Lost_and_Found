import React, { useState, useRef } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ReportItem() {
  
  const isLoggedin = useSelector(state=>state.auth.isLoggedin);
  if(!isLoggedin){
    return <Navigate to={'/'} replace/>
  }


  const fileInputRef = useRef(null);

  const [report, setReport] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
    submitted_to : 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReport({
      ...report,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setReport({
      ...report,
      image: e.target.files[0]
    });
  };

  const handleSelectChange = (e) => {
    setReport({
      ...report,
      submitted_to: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", report.title);
      formData.append("description", report.description);
      formData.append("location", report.location);
      //formData.append("uploaded_by", user?.id); //Ignored by backend anyways //Again For Security Purpose
      formData.append("image", report.image);
      formData.append("submitted_to", report.submitted_to);
      console.log(user.role);
      //Fix The Code For Security Pupose Status Should change in Backend based on role not from Frontend
      const url =
      user?.role?.toLowerCase() === "staff"
      ? "http://localhost:5000/api/items/staff/report"
      : "http://localhost:5000/api/items/report"

      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`

          }
        }
      );

      alert(response.data.message);

      setReport({
        title: "",
        description: "",
        location: "",
        image: null,
        submitted_to: 1,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error submitting report");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Report Found Item
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Item Name
            </label>

            <input
              type="text"
              name="title"
              value={report.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={report.description}
              onChange={handleChange}
              //no need to be mandatory..other info is enough
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={report.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image of Item
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              required
              className="w-full border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Submitted to 
            </label>
            <select
              onChange={handleSelectChange}
              value={report.submitted_to}
              required
              className="w-full border rounded-lg"
            >
            <option value={1}>cse</option>
            <option value={1}>ce</option>
            <option value={1}>ee</option>
            <option value={1}>me</option>
            </select>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}