import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reducers: {
            login(state, action) {
              state.isAuthenticated = true;
              state.user = action.payload.user; 
              state.token = action.payload.token; 
              AsyncStorage.setItem('user', JSON.stringify(action.payload.user)); 
              AsyncStorage.setItem('authToken', action.payload.token); 
            },
            logout(state) {
              state.isAuthenticated = false;
              state.user = null;
              state.token = null;
              AsyncStorage.removeItem('user'); 
              AsyncStorage.removeItem('authToken'); 
            },
            setUserFromStorage(state, action) {
              state.user = action.payload.user;
              state.token = action.payload.token;
              state.isAuthenticated = true;
            }
          },
    }
})



export const { login, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;