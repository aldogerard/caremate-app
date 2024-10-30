import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/feature/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
