import React, { useState, useRef } from "react";

export default function ReportItem() {
  const fileInputRef = useRef(null);
  const [report, setReport] = useState({
    itemName: "",
    itemDesc: "",
    location: "",
    image: null
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setReport({
      ...report,
      [name]: value
    });
  };

  // Handle file input
  const handleImageChange = (e) => {
    setReport({
      ...report,
      image: e.target.files[0]
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Report:", report);
    setReport({
      itemName: "",
      itemDesc: "",
      location: "",
      image: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
              name="itemName"
              placeholder="Enter item name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={report.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>

            <textarea
              name="itemDesc"
              rows={4}
              placeholder="Enter item description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={report.itemDesc}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Location
            </label>

            <input
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image of Item
            </label>

            <input
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