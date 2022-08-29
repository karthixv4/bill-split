import React from 'react'
import {useParams} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGroupById } from '../../reducers/oneGroup';
const ViewGroup = () => {
    const group = useSelector((state)=>state.oneGroup.group);

    const dispatch = useDispatch();
    let {id} = useParams();
    useEffect(()=>{
        dispatch(fetchGroupById(id))
    },[id])
  return (
    <div>viewGroup
       <br/>
       <h2>{group.name}</h2>
       <ul>
       {group.members.map((ele)=>(
       <li key={ele}>{ele}</li>
  ))}
  </ul>
    </div>
  )
}

export default ViewGroup