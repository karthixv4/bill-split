import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/loginSlice";
import GroupReducer from "../reducers/groupSlice";
const store = configureStore({
reducer:{
    login:LoginReducer,
    group:GroupReducer
}
});

export default store;