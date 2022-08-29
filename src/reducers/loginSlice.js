import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState={
  isLoggedin:false,
  userDetails:{
    id:0,
    name:"",
    email:"",
    password:""
}
}

export const saveUsers = createAsyncThunk("users/save", (user) => {
    fetch(`http://localhost:3002/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  });
const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
       LoggedIn:(state,action)=>{

        if(state.isLoggedin==false){
            window.location.href="/login"
        }
       },
       name:(state,action)=>{
        state.userDetails.name=action.payload;
       },
       email:(state,action)=>{
        state.userDetails.email=action.payload;
       },
       password:(state,action)=>{
        state.userDetails.password=action.payload;
       },
       

    },
    extraReducers:()=>{}
})
export const {LoggedIn,name,email,password} = loginSlice.actions;
export default loginSlice.reducer;