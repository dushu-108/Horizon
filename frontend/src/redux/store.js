import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import dataReducer from "./features/dataSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer
    },
});

export default store;