import React, { useState, useEffect } from "react";
import { ItemCard } from "../components";
import axios from "axios";

function Home() {

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("unclaimed"); //filter for browsing items(claimed or unclaimed)
  const [searchVal, setSearchVal] = useState("");
  function  handleChange(e){
    setFilter(e.target.value);
  };
  function  handleSearch(e){
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, [filter, searchVal]);
  

  return (
    <div className="w-full min-h-screen bg-gray-50">

      <div className="w-full bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between px-4 py-3 gap-3">
          
          <h1 className="text-lg font-semibold text-gray-800">Welcome {user?.full_name}
          </h1>

          <div className="flex w-full md:w-auto gap-2 items-center">
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Search here"
              className="w-full p-2  focus:outline-none focus:ring-2 focus:ring-gray-900"
              
              onChange={handleSearch}
              required
            />
            <select onChange={handleChange} name="dataFilter" value={filter} className=" py-2 font-medium transition-all duration-300 transform mr-4 focus:outline-none border-r-gray-900">
            <option value="claimed">Claimed</option>
            <option value="unclaimed">UnClaimed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ItemCard items={items} filter={filter} searchVal={searchVal} />
      </div>
  </div>
  );
}

export default Home;
