import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import useReducer from "react";
import productsSlice from "./reducers/productsSlice";
import wishListSlice from "./reducers/wishlistSlice";
import ordersSlice from "./reducers/ordersSlice";
import basketSlice from "./reducers/basketSlice";

export const store = configureStore({
    reducer: {
        users: userSlice,
        user: useReducer,
        products: productsSlice,
        favorites: wishListSlice,
        orders: ordersSlice,
        basket: basketSlice,
    }
})