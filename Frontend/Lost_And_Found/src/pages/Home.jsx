import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import axios from "axios";

function Home() {

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [items, setItems] = useState([]);
  
  const [filter, setFilter] = useState("unclaimed"); //filter for browsing items(claimed or unclaimed)
  function  handleChange(e){
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, [filter]);

  return (
    <div className="w-full">
      <div className="w-full h-12 bg-slate-500 p-auto flex items-center">
        <h1 className="mr-auto ml-4">Welcome {user?.full_name}</h1>
        <select onChange={handleChange} name="dataFilter" value={filter} className="px-3 py-2 font-medium transition-all duration-300 transform mr-4">
          <option value="claimed">Claimed</option>
          <option value="unclaimed">UnClaimed</option>
        </select>
      </div>
    
      <h1>{user.role}</h1>
      <ItemCard items={items} />
    <div>
      <h1>Welcome {user?.full_name}</h1>
    </div>
  </div>
  );
}

export default Home;
