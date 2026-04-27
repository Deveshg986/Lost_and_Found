import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserPostCard, LoadingCard } from '../components';
import { Navigate } from 'react-router-dom';
import { getUserPosts } from '../items/itemsSlice';



function MyPosts() {

  const { isLoggedin, userData } = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const { visibleItems = [], loading, error } = useSelector 
  ((state) => state.items);
  

  useEffect(() => {
    dispatch(getUserPosts());
  },[dispatch])

  if(!isLoggedin){
    return <Navigate to={'/'} replace/>
  }
  if(loading) return <LoadingCard/>
  if(error) return <p>{error}</p>

  return (
    <div className='w-full h-full'>
      <UserPostCard items={visibleItems}/>
    </div>
  )
}

export default MyPosts