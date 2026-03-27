import {ItemCard, LoadingCard} from "../components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Requests(){
  const dispatch = useDispatch();
  const { visibleItems, loading, error } = useSelector((state) => state.items);
  const {userData} = useSelector((state)=>state.auth);
  const [status, setStatus] = useState("");
  if(userData.role.trim().toLowerCase() === "student"){


  }else{
    useEffect(() => {

      dispatch(  );

    }, [dispatch]);

  }
  if(!userData.isLoggedin || loading || !items.lenth) return <LoadingCard/>

  return (
    <ItemCard items={items} Filter="requested" />
  );
}