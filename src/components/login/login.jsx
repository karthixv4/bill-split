import React from 'react';
import {  useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  return (
    <div>Login

        <button onClick={()=>navigate('/')}>Take me home</button>
    </div>
  )
}

export default Login