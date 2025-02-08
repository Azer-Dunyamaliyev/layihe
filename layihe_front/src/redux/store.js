import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import useReducer from "react";
import productsSlice from "./reducers/productsSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        user: useReducer,
        products: productsSlice,
    }
})