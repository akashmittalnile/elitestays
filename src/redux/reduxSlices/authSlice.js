// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchToken = createAsyncThunk('auth/fetchToken', async () => {
  const authToken = await AsyncStorage.getItem('authToken')
  const user = await AsyncStorage.getItem('user')
  console.log('fetchToken', { authToken, user });
  
  return { authToken, user };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    isAuthenticated: false,
    user: {}
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.authToken;
    },
    clearToken: (state) => {
      state.authToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.authToken;
    });
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
