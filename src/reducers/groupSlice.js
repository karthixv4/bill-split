import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    users:[],
    user:[],
    filteredUsers:[],
    selectedUsers:[],
    group:{
        name:"",
        members:[]
    }
}

export const fetchAllUsers = createAsyncThunk("users/fetchAll",()=>{
    return fetch("http://localhost:3002/users").then((response) =>
    response.json()
  );
})
export const fetchUser = createAsyncThunk("user/fetch",(id)=>{
    return fetch(`http://localhost:3002/users/${id}`).then((response) =>
    response.json()
  );
})
export const createGroup = createAsyncThunk("users/save", (group) => {
    fetch(`http://localhost:3002/Groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  });

const groupSlice = createSlice({
    name:"group",
    initialState,
    reducers:{
        filterUsers:(state,action)=>{
            state.filteredUsers=[];
          let userId = action.payload.user.id;
          let users = action.payload.users;
        const filterUsers = users.filter((user)=>user.id !== userId);
       let username = (keys) => {
        return keys.startsWith("name")
       }
      
       filterUsers.map((e)=>{
        Object.keys(e).filter(username).forEach((val)=>{
        //    state.filteredUsers.push(e.name)
        state.filteredUsers.push({
            name:e.name,
            email:e.email
        })
        })
       })
        },
        setSelectedUsers:(state,action)=>{
            state.selectedUsers=[]
            state.selectedUsers.push(action.payload)
        },
        setGroupName:(state,action)=>{
            state.group.name=action.payload;
        },
        setGroupMembers:(state,action)=>{
            state.group.members=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.users=action.payload
        });
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.user=action.payload
        })
    }
})
export const {filterUsers,setSelectedUsers,setGroupName,setGroupMembers} = groupSlice.actions
export default groupSlice.reducer;