import ItemCard from "../components/ItemCard";
import React from "react";
export default function LostItems() {
    const item =[
        {id:1, title:"Wallet", description:"new item",location:"classroom 7", date:"12/5/5", status:"APPROVED" }
    ]
  return (
    <ItemCard items={item}/>
  )
}
