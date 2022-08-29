import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
group:[]
}
export const fetchGroupById = createAsyncThunk("group/fetchById",(id)=>{
    return fetch(`http://localhost:3002/Groups/${id}`).then((response) =>
    response.json()
  );
})

const oneGroupSlice = createSlice({
name:"oneGroup",
initialState,
reducers:{},
extraReducers:(builder)=>{
    builder.addCase(fetchGroupById.fulfilled,(state,action)=>{
state.group = action.payload
    })
}
})
export default oneGroupSlice.reducer