import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchAllUsers,fetchUser,setGroupName,setGroupMembers } from '../../reducers/groupSlice';
import { filterUsers } from '../../reducers/groupSlice';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { createGroup } from '../../reducers/groupSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
const AddGroup = () => {
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.group.users);
    const user = useSelector((state)=>state.group.user)
    const filteredUsers=useSelector((state)=>state.group.filteredUsers)
    const selectedUsers = useSelector((state)=>state.group.selectedUsers)
    const group = useSelector((state)=>state.group.group)
    const groupMembers = useSelector((state)=>state.group.group.members)
    useEffect(()=>{
dispatch(fetchAllUsers());
localStorage.setItem("id",4);
localStorage.setItem("name","vignesh")
dispatch(fetchUser(4));
    },[])

    //Select users

    const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
   
    dispatch(setGroupMembers( typeof value === 'string' ? value.split(',') : value))
   
 
  };
  return (
    <div>addGroup
       <button onClick={()=>dispatch(filterUsers({users,user}))}>Hey</button>
       <br/>
       <input placeholder='group name' onChange={(e)=>{dispatch(setGroupName(e.target.value))}} />
       <br/>
       <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
        
          multiple
          value={groupMembers}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Members" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filteredUsers.map((name) => (
            <MenuItem
              key={name.email}
              value={name.email}
              style={getStyles(name.name, groupMembers, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br/>
      <button onClick={()=>{
        
       dispatch(createGroup(group))
      }}>Create Group</button>
    </div>
  )
}

export default AddGroup