import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../reducers/loginSlice";
import GroupReducer from "../reducers/groupSlice";
import OneGroupReducer from "../reducers/oneGroup";
const store = configureStore({
reducer:{
    login:LoginReducer,
    group:GroupReducer,
    oneGroup:OneGroupReducer
}
});

export default store;