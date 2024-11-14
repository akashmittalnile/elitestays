import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'

const storeOld = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default storeOld;