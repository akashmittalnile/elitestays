// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchToken = createAsyncThunk('auth/fetchToken', async () => {
  const authToken = await AsyncStorage.getItem('authToken')
  const user = await AsyncStorage.getItem('user')
  const parsedUser = JSON.parse(user);
  console.log('fetchToken', { authToken, parsedUser });
  return { authToken, user: parsedUser };
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
      AsyncStorage.setItem('authToken', action.payload.authToken);
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearToken: (state) => {
      state.authToken = null;
      state.user = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('authToken');
      AsyncStorage.removeItem('user');
      
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
