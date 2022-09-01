import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, fetchUser, setGroupName, setGroupMembers, addAdmintoMember, removeAdmin } from '../../reducers/groupSlice';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
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
  const users = useSelector((state) => state.group.users);
  const user = useSelector((state) => state.group.user)
  const filteredUsers = useSelector((state) => state.group.filteredUsers)
  const selectedUsers = useSelector((state) => state.group.selectedUsers)
  const group = useSelector((state) => state.group.group)
  const groupMembers = useSelector((state) => state.group.group.members)
  useEffect(() => {
    dispatch(fetchAllUsers());
    localStorage.setItem("id", 4);
    localStorage.setItem("name", "vignesh")
    localStorage.setItem("email", "vicky@gmail.com")
    dispatch(fetchUser(4));
  }, [])

  //Select users

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatch(setGroupMembers(typeof value === 'string' ? value.split(',') : value))

  };
  //dialog alert
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(removeAdmin());
    setOpen(false);
  };
  const handleClose2 = () => {
    dispatch(createGroup(group));
    setOpen(false);
  };
  return (
    <div>
      <div class="bg-white dark:bg-gray-800 ">
        <div class="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span class="block">
              One group for managing all your expense
            </span>

            <span class="block text-indigo-500">
              create one here!
            </span>
          </h2>

        </div>
      </div>

      <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">

        <div class="mt-8">
         
            <div class="flex flex-col mb-2">
              <div class=" relative ">
                <label for="name-with-label" class="text-gray-700">
                  Group name
                </label>
                <input type="text" onChange={(e)=>dispatch(setGroupName(e.target.value))} id="name-with-label" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="email" placeholder="Your name" />
              </div>
            </div>
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
            <div class="flex w-full">
              <button onClick={() => {
        setOpen(true);
        dispatch(addAdmintoMember(localStorage.getItem("email")))
      }} class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
               Create Group
              </button>
            </div>
        
        </div>
       
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to create a group"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
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

export default AddGroup