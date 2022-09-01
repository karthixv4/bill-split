import React from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { fetchGroupById } from '../../reducers/oneGroup';
import { setExpenseAmount, setExpenseName, setExpenseSharedAmong, filterMemberForExpense,splitExpense,updatedGroup } from '../../reducers/oneGroup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { fetchAllUsers, fetchUser } from '../../reducers/groupSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateGroup } from '../../reducers/oneGroup';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './viewGroup.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Expenses from './expenses';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

const ViewGroup = () => {
  const users = useSelector((state) => state.oneGroup.group.members);

  const user = useSelector((state) => state.group.user)

  const group = useSelector((state) => state.oneGroup.group);

  const groupMembers = useSelector((state) => state.oneGroup.expense.sharedAmong);

  const filteredUsers = useSelector((state) => state.oneGroup.filteredMembers)
 
  const expense = useSelector((state) => state.oneGroup.expense)


  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    dispatch(fetchGroupById(id))
    dispatch(fetchAllUsers())
    localStorage.setItem("id", 4);
    localStorage.setItem("name", "vignesh")
    dispatch(fetchUser(4));
  }, [id])


  //Select users

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(setExpenseSharedAmong(typeof value === 'string' ? value.split(',') : value))


  };
    //dialog alert
    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleClose2 = () => {
     dispatch(updateGroup(group))
     setOpen(false);
    };
    //add expense form
    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
      dispatch(filterMemberForExpense({ users, user }))
      setOpen2(true);
    };
  
    const handleClose3 = () => {
      setOpen2(false);
    };
    const handleClose4 = () => {
      setOpen(true);
      dispatch(updatedGroup(expense))
      setOpen2(false);
     
    };
//checkbox
const [checked, setChecked] = React.useState(false);

const handleChange5 = (event) => {
  setChecked(event.target.checked);
  dispatch(splitExpense(groupMembers));
};
//paths
const [value, setValue] = React.useState(0);

const handleChange8 = (event, newValue) => {
  setValue(newValue);
};

  return (
    <div>
         <div className='heading'>
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{group.name}</span> </h1>
        </div>
        <div>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>
          <Expenses></Expenses>
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
          <div class="px-4 py-5 sm:px-6 w-full border dark:bg-gray-800 bg-white shadow mb-2 rounded-md">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
        <Button variant="contained" onClick={handleClickOpen2}>Create an Expense</Button>
        </h3>
        <br/>
        <h4>Members</h4>
        
    </div>
          <div class="container flex flex-col mx-auto items-center justify-end">
    <ul class="flex flex-col">
      {group.members.map((ele)=>(
 <li class="border-gray-400 flex flex-row mb-2" key={ele}>
 <div class="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
    
     <div class="flex-1 pl-1 md:mr-16">
         <div class="font-medium dark:text-white">
            {ele}
         </div>
        
     </div>
   
     <button class="w-24 text-right flex justify-end">
         <svg width="12" fill="currentColor" height="12" class="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
             <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
             </path>
         </svg>
     </button>
 </div>
</li>
      ))}
       
    </ul>
</div>
          </Item>
        </Grid>
       
      </Grid>
    </Box>
        </div>

 
     
   
     
  
    <Dialog open={open2} onClose={handleClose3}>
        <DialogTitle>Add a expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Expense Name"
            onChange={(e) => dispatch(setExpenseName(e.target.value))} 
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            onChange={(e) => dispatch(setExpenseAmount(e.target.value))}
            id="amount"
            label="Expense Amount"
            type="text"
            fullWidth
            variant="standard"
          />
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
              key={name}
              value={name}
              style={getStyles(name, groupMembers, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup>
      <FormControlLabel control={ <Checkbox
      checked={checked}
      onChange={handleChange5}
      inputProps={{ 'aria-label': 'controlled' }}
    />} label="Split and add to user's account" />
     
    </FormGroup>
     

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancel</Button>
          <Button onClick={()=>{
           
            handleClose4()
          }}>Create</Button>
        </DialogActions>
      </Dialog>
     <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to create a group"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  
  )
}

export default ViewGroup