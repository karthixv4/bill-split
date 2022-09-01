import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchGroups } from '../../reducers/groupSlice';
import { filterGroupsForUser } from '../../reducers/groupSlice';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './table.css';

const Groups = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state)=>state.group.allGroups)
    const filteredGroups = useSelector((state)=>state.group.filteredGroups)
    const navigate = useNavigate();
//    useEffect(()=>{
    
// dispatch(filterGroupsForUser({groups}))
//    },[groups])
  return (
    <>
     <button onClick={()=>{dispatch(filterGroupsForUser({groups}))}}>My groups</button>
  
    <div className='cardContainer'> 
       
        {filteredGroups.map((ele)=>(
          
                <a onClick={()=>navigate(`/view/${ele.id}`)} key={ele.id}>
            <Card sx={{ maxWidth: 345 }}  key={ele.id}>
             <CardActionArea>
               <CardContent>
                 <Typography gutterBottom variant="h5" component="div">
                 {ele.name}
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Lizards are a widespread group of squamate reptiles, with over 6,000
                   species, ranging across all continents except Antarctica
                 </Typography>
               </CardContent>
             </CardActionArea>
             <CardActions>
               <Button size="small" color="primary">
                 Share
               </Button>
             </CardActions>
           </Card>
            </a>
            
        
            
        
        ))}

    </div>
    </>
  )
}

export default Groups