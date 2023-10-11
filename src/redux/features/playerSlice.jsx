import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';
debugger
const initialState = {
  username: null,
  password: null,
  isLogin: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,

  reducers: {
    setRegisterLogin: (state, action) => (
        state.username = action.payload.username,
        state.password = action.payload.password,
       
        state.isLogin = true
    ),
    setLogout: (state) => (
        state.username = null,
        state.password = null,
        
        state.isLogin = false
    )
  },
});

export const {setRegisterLogin, setLogout } = playerSlice.actions;

export default playerSlice.reducer;