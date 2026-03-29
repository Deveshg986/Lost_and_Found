import {ItemCard, LoadingCard} from "../components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { filterByStatus, getAllItems, getPendingItems } from "../items/itemsSlice";


export default function Requests(){
  
  const isLoggedin = useSelector(state=>state.auth.isLoggedin);
  const dispatch = useDispatch();
  const { allItems, visibleItems, loading, error } = useSelector((state) => state.items);
  const {userData} = useSelector((state)=>state.auth);
  const [status, setStatus] = useState("");

  useEffect(()=>{
    if(userData.role.trim().toLowerCase() === "student"){
      
    }else{
      dispatch(getPendingItems());
    }
  },[userData, dispatch, allItems.length]);

  if(!isLoggedin){
    return <Navigate to={'/'} replace/>
  }
  if(loading) return <LoadingCard/>
  if(!visibleItems.length) return <p>No items Found</p>
  return (
    <ItemCard items={visibleItems} requests={true}/>
  );
}