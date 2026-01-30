import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import dataReducer from "./features/dataSlice.js";
import logoReducer from "./features/logoSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        logo: logoReducer
    },
});

export default store;