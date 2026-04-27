import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createClaimAPI } from "../claims/claimsAPI";
import API from "../utils/axiosInstance";

const ItemCard = ({ items, requests }) => {
  const { userData } = useSelector(state => state.auth);

  const [loadingId, setLoadingId] = useState(null);
  const [claimedIds, setClaimedIds] = useState(new Set()); // track locally claimed items

  const handleClaim = async (itemId) => {
    const message = window.prompt("Enter Message");
    if (!message) return;

    try {
      setLoadingId(itemId);
      const data = await createClaimAPI(itemId, message);
      alert(data.message || "Claim Submitted Successfully!");
      // Mark this item as claimed locally so the button disappears immediately.
      // B status sThe item's Dtays APPROVED until staff approves the claim.
      setClaimedIds((prev) => new Set(prev).add(itemId));
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Error Claiming Item";
      alert(errMsg);
    } finally {
      setLoadingId(null);
    }
  };

  const baseURL = `${import.meta.env.VITE_API_URL}/api/items/`;

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);
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
      alert("Error updating status: " + (err?.response?.data?.message || "Try again"));
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (

        (<div
          key={item.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Image */}
          <div className="relative">
            <img
            src={item.image?.trim()}
            alt={item.title}
            onError={(e) => {
              console.log("FAILED:", item.image);
              e.target.src = "/placeholder.png";
            }}
          />

            {/* Status badge */}
            <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
              {claimedIds.has(item.id) ? "Requested Claim" : item.status}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col justify-between flex-grow">
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
                  <span className="font-medium text-gray-700">Reported by: </span>{" "}
                  {item.reported_by_name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">📅</span>{" "}
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2">

              {/* Claim only for approved items the student hasn't claimed yet */}
              {item.status === "APPROVED" && !claimedIds.has(item.id) && (
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                  onClick={() => handleClaim(item.id)}
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? "Claiming..." : "Claim Item"}
                </button>
              )}

              {/* Staff controls */}
              {userData?.role?.trim().toLowerCase() === "staff" && item.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus(item.id, "APPROVED")}
                    className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                    disabled={loadingId === item.id}
                  >
                    {loadingId === item.id ? "Approving..." : "Approve Item"}
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "REJECTED")}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                    disabled={loadingId === item.id}
                  >
                    {loadingId === item.id ? "Rejecting..." : "Reject Item"}
                  </button>
                </>
              )}

              {/* Delete for staff */}
              {userData?.role?.trim().toLowerCase() === "staff" && (
                <button
                  onClick={() => updateStatus(item.id, "DELETED")}
                  className="w-full bg-red-500 hover:bg-red-600 active:scale-[0.98] transition text-white text-sm py-2 rounded-lg font-medium"
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? "Deleting..." : "Delete Item"}
                </button>
              )}

            </div>
          </div>
        </div>)
      ))}
    </div>
  );
};

export default ItemCard;