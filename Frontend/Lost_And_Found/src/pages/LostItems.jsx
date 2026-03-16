import axios from "axios";
import ItemCard from "../components/ItemCard";
import React, { useState, useEffect } from "react";

export default function LostItems() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, [items]); 

  return (
    <ItemCard items={items} />
  );
}