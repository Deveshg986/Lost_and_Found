import React, { useState, useRef } from "react";
import axios from "axios";

export default function ReportItem() {
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const [report, setReport] = useState({
    title: "",
    description: "",
    location: "",
    image: null
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();
      formData.append("title", report.title);
      formData.append("description", report.description);
      formData.append("location", report.location);
      formData.append("uploaded_by", user.id);
      formData.append("image", report.image);

      const response = await axios.post(
        "http://localhost:5000/api/items/report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert(response.data.message);

      setReport({
        title: "",
        description: "",
        location: "",
        image: null
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
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
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
              Item Name
            </label>

            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={report.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter item description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={report.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>

            <input
              id="location"
              type="text"
              name="location"
              placeholder="Enter item location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={report.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
              Image of Item
            </label>

            <input
              id="image"
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="
                w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                border border-gray-300
                rounded-lg cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}