import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
group:{
    id:0,
    name:"",
    members:[],
    expense:[]
},
filteredMembers:[],
expenses:[],
expense:{
    name:"",
    amount:0,
    sharedAmong:[],
    toPay:[]
}
}
export const fetchGroupById = createAsyncThunk("group/fetchById",(id)=>{
    return fetch(`http://localhost:3002/Groups/${id}`).then((response) =>
    response.json()
  );
})

export const updateGroup = createAsyncThunk("group/update", (group) => {
    
    fetch(`http://localhost:3002/Groups/${group.id}`, {
      method: "PUT",
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

const oneGroupSlice = createSlice({
name:"oneGroup",
initialState,
reducers:{
    setExpenseName:(state,action)=>{
        state.expense.name=action.payload;
    },
    setExpenseAmount:(state,action)=>{
        state.expense.amount=action.payload;
    },
    setExpenseSharedAmong:(state,action)=>{
        state.expense.sharedAmong=action.payload;
    },
    filterMemberForExpense:(state,action)=>{
        state.filteredMembers=[];
        let userId = action.payload.user.email;
        let users = action.payload.users;
        const filterUsers = users.filter((user)=>user !== userId);
        state.filteredMembers=filterUsers;
    },
    splitExpense:(state,action)=>{
      let amount = state.expense.amount;
      let length=action.payload.length
      let equalPay=amount/length;
      console.log("pau",equalPay);
     
     let sharedMembers=  action.payload
     console.log("shared",sharedMembers)
     sharedMembers.map((ele)=>{
    state.expense.toPay.push({
        "email":ele,
        "amount":equalPay,
        "paid":false

      })
     })
    },
    updatedGroup:(state,action)=>{
       
        state.group.expense.push(action.payload);
       
    }
},
extraReducers:(builder)=>{
    builder.addCase(fetchGroupById.fulfilled,(state,action)=>{
state.group.name = action.payload.name;
state.group.members=action.payload.members;
state.group.id=action.payload.id;
state.group.expense=action.payload.expense;

    })
}
})
export const {setExpenseAmount,setExpenseName,setExpenseSharedAmong,filterMemberForExpense,splitExpense,updatedGroup} = oneGroupSlice.actions;
export default oneGroupSlice.reducer