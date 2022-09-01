import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    users:[],
    user:null,
    filteredUsers:[],
    selectedUsers:[],
    group:{
        name:"",
        members:[],
        expense:[]
    },
    allGroups:[],
    filteredGroups:[],
    finalGroup:{
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

  export const fetchGroups = createAsyncThunk("groups/fetchAll",()=>{
    return fetch("http://localhost:3002/Groups").then((response) =>
    response.json()
  );
})

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
        },
        filterGroupsForUser:(state,action)=>{
          state.filteredGroups = []
          let Groups = action.payload.groups;
          const email = "ankit@gmail.com"
          let members = (keys) => {
            return keys==email
           }
          Groups.map((ele)=>{
            ele.members.filter(members).forEach((val)=>{
             state.filteredGroups.push({
              id:ele.id,
              name:ele.name,
              members:ele.members
             })
            })
          })
        },
        addAdmintoMember:(state,action)=>{
          state.group.members.push(action.payload)
        },
        removeAdmin:(state,action)=>{
          state.group.members.pop();
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllUsers.fulfilled,(state,action)=>{
            state.users=action.payload
        });
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.user=action.payload
        })
        builder.addCase(fetchGroups.fulfilled,(state,action)=>{
          state.allGroups=action.payload;
        })
    }
})
export const {filterUsers,setSelectedUsers,setGroupName,setGroupMembers,filterGroupsForUser,addAdmintoMember,removeAdmin} = groupSlice.actions
export default groupSlice.reducer;