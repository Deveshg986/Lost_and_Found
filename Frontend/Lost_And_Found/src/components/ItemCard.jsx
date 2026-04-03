import axios from "axios";

import React, { useState } from "react";

const ItemCard = ({ items }) => {
  const handleClaim = async (itemId) => {
    const message = prompt("Enter the message to prove this is Your Item")
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/claims",
        {
          item_id: itemId,
          message: message || null
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error claiming item")
    }
  }
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const baseURL = "http://localhost:5000/api/items/";

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      let url = "";
      let method = "put";

      if (status === "APPROVED") {
        url = `${baseURL}${id}/approve`;
      } else if (status === "REJECTED") {
        url = `${baseURL}${id}/reject`;
      } else if (status === "DELETED") {
        url = `${baseURL}${id}`;
        method = "delete";
      }

      await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert(`Item ${status.toLowerCase()} successfully`);
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Error updating status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            {/* Status badge */}
            <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              {item.status}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col justify-between h-[220px]">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 text-xs text-gray-600 space-y-1">
                <p>
                  <span className="font-medium text-gray-700">📍</span>{" "}
                  {item.location}
                </p>
                <p>
                  <span className="font-medium text-gray-700">📅</span>{" "}
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2">

              {/* Claim only for approved */}
              {item.status === "APPROVED" && (
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                onClick={() => handleClaim(item.id)}
                >
                  Claim Item
                </button>
              )}

              {/* Staff controls */}
              {user?.role?.trim().toLowerCase() === "staff" && item.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus(item.id, "APPROVED")}
                    className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                  >
                    Approve Item
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "REJECTED")}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                  >
                    Reject Item
                  </button>
                </>
              )}

              {/* Delete for staff */}
              {user?.role?.trim().toLowerCase() === "staff" && (
                <button
                  onClick={() => updateStatus(item.id, "DELETED")}
                  className="w-full bg-red-500 hover:bg-red-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                >
                  Delete Item
                </button>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;