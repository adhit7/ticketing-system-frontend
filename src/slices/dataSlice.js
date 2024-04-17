import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queries: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setQueries: (state, action) => {
      state.queries = action.payload;
    },
    removeQueries: (state, action) => {
      state.queries = [];
    },
  },
});

export const { setQueries, removeQueries } = dataSlice.actions;

export default dataSlice.reducer;
