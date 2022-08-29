import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Hero from './Hero';
const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Hero></Hero>
    </div>
  )
}

export default Home