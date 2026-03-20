import React, { useState, useRef } from "react";
import axios from "axios";

export default function ReportItem() {
  const fileInputRef = useRef(null);

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
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", report.title);
      formData.append("description", report.description);
      formData.append("location", report.location);
      formData.append("uploaded_by", user?.id);
      formData.append("image", report.image);

      //FIXED STATUS (match DB)
      formData.append(
        "status",
        user?.role?.trim().toLowerCase() === "staff"
          ? "APPROVED"
          : "PENDING"
      );

      const response = await axios.post(
        "http://localhost:5000/api/items/report",
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
        image: null
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
              required
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