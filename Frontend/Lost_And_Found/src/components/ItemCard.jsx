import React from "react";
import { useState } from "react";
const ItemCard = ({ items }) => {
    const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  return (
    <div className="grid md:grid-cols-3 gap-6 my-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.title}
            className="w-full h-40 object-cover rounded-md mb-3"
          />

          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <p className="text-sm">
            <span className="font-medium">Location:</span> {item.location}
          </p>
          <p className="text-sm">
            <span className="font-medium">Date:</span> {item.created_at}
          </p>
          <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mt-2">
            {item.status}
          </span>
          <button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
            Claim Item
          </button>
          
          {
            user?.role === 'STAFF' ? (
          <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">
            Delete Item
          </button>) : null
          }
        </div>
      ))}
    </div>
  );
};

export default ItemCard;