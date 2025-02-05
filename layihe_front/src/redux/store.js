import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import useReducer from "react";

export const store = configureStore({
    reducer: {
        users: userSlice,
        user: useReducer
    }
})