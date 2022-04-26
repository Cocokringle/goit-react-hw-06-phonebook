import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name:'filter',
    initialState: {
      value: '',
    },
    reducers: {
      set(state, action) {
        state.value = action.payload;
      },
    },
});

export const { set } = filterSlice.actions;