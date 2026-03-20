import axios from "axios";
import {ItemCard} from "../components";
import React, { useState, useEffect } from "react";

export default function Requests() {
    const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/items/approved",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);
    console.log("inside requests");
    
  return (
    <ItemCard items={items} Filter="requested" />
  );
}