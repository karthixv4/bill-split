import React from 'react'
import { name,email,password } from '../../reducers/loginSlice';
import { useDispatch } from 'react-redux';
import { saveUsers } from '../../reducers/loginSlice';
import { useSelector } from 'react-redux';
const Register = () => {
  const user = useSelector((state)=>state.login.userDetails);
  const dispatch = useDispatch();
  const handleForm=(e)=>{
    
    e.preventDefault();
    dispatch(saveUsers(user));
  }
  return (
    <div>register
      <form onSubmit={handleForm}>
        <input placeholder='name' onChange={(e)=>dispatch(name(e.target.value))} />
        <br/>
        <input placeholder='email' onChange={(e)=>dispatch(email(e.target.value))} />
        <br/>
        <input placeholder='password' onChange={(e)=>dispatch(password(e.target.value))} />
        <br/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default Register