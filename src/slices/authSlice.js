import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  checkTempPassword: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTempPasswordStatus: (state, action) => {
      state.checkTempPassword = action.payload;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userInfo = null;
      state.checkTempPassword = false;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setTempPasswordStatus, setCredentials, removeCredentials } =
  authSlice.actions;

export default authSlice.reducer;
