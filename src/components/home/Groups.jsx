import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchGroups } from '../../reducers/groupSlice';
import { filterGroupsForUser } from '../../reducers/groupSlice';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const Groups = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state)=>state.group.allGroups)
    const filteredGroups = useSelector((state)=>state.group.filteredGroups)
    const navigate = useNavigate();
//    useEffect(()=>{
    
// dispatch(filterGroupsForUser({groups}))
//    },[groups])
  return (
    <div>Groups
        <button onClick={()=>{dispatch(filterGroupsForUser({groups}))}}>My groups</button>
        {filteredGroups.map((ele)=>(
            <div>
                <a onClick={()=>navigate(`/view/${ele.id}`)}>
            <h3 key={ele.id}>{ele.name}</h3>
            </a>
            
            {
                ele.members.map((ele)=>(
                    <ul>
                        <li key={ele}>{ele}</li>
                    </ul>
                ))
            }
            <br/>
            </div>
        
        ))}
    </div>
  )
}

export default Groups