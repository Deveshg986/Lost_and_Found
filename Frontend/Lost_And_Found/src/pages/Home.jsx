import React, { useState, useEffect } from "react";
import { ItemCard, LoadingCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { searchItems } from "../items/itemsSlice";



function Home() {
  const dispatch = useDispatch();
  const { visibleItems = [], loading, error } = useSelector((state) => state.items);
  const {userData} = useSelector((state)=>state.auth);
  const [searchVal, setSearchval] = useState("");

  const [status, setStatus] = useState("");
  
useEffect(() => {
  dispatch(searchItems({ status, search: searchVal }));
}, [ ]);

  if(loading) return <LoadingCard/>
  if(error) return <p>{error}</p>

  return (
    <div className="w-full min-h-screen bg-gray-50">

      <div className="w-full bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between px-4 py-3 gap-3">
          
          <h1 className="text-lg font-semibold text-gray-800">Welcome {userData?.full_name}
          </h1>

          <div className="flex w-full md:w-auto gap-2 items-center">
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Search here"
              className="w-full p-2 ring-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              onChange={(e)=>setSearchval(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(searchItems(buildFilters()));
                  }
                }}
              required
            />
            <button
              disabled={loading}
              onClick={() => dispatch(searchItems({ status, search: searchVal }))}>
              🔍
            </button>
            <select onChange={(e)=>setStatus(e.target.value)} value={status}>
              <option value="">All</option>
              <option value="CLAIMED">Claimed</option>
              <option value="APPROVED">Unclaimed</option>
            </select>
          </div>
        </div>
      </div>

      
        {
            !loading && visibleItems.length === 0 ? (
              <p>No items found</p>
                ) : (
              <ItemCard items={visibleItems} searchVal={searchVal} />
            )
        }
      
  </div>
  );
}

export default Home;
