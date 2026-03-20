import React from "react";
import "./LoadingCard.css"

const Card = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">

    <div className="w-full h-48 shimmer"></div>

    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 shimmer rounded"></div>
      <div className="h-3 w-full shimmer rounded"></div>
      <div className="h-3 w-5/6 shimmer rounded"></div>

      <div className="pt-2 space-y-2">
        <div className="h-3 w-1/2 shimmer rounded"></div>
        <div className="h-3 w-1/3 shimmer rounded"></div>
      </div>

      <div className="pt-3 space-y-2">
        <div className="h-8 bg-gray-300 rounded-lg"></div>
        <div className="h-8 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
};

export default LoadingCard;