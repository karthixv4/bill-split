import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Groups from './Groups';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../reducers/groupSlice';
const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(fetchGroups())
  },[])
    const navigate = useNavigate();
  return (
    <div>
      <Hero></Hero>
      <Groups></Groups>
    </div>
  )
}

export default Home