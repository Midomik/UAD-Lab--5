import { createSlice } from '@reduxjs/toolkit';

const resultsInitialState = {
  gameHistory: [],
};

const resultsSlice = createSlice({
  name: 'results',

  initialState: resultsInitialState,

  reducers: {
    addItemHistory(state, { payload }) {
      state.gameHistory = payload;
    },
  },
});

export const { addItemHistory } = resultsSlice.actions;

export const resultsReducer = resultsSlice.reducer;
