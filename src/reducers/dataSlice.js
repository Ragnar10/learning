// Core
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name:         'data',
    initialState: {
        activity: {},
    },
    reducers: {
        setActivity: (state, action) => {
            state.activity = action.payload;
        },
    },
});

export const {
    setActivity,
} = dataSlice.actions;

export default dataSlice.reducer;
