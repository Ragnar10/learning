// Core
import { createSlice } from '@reduxjs/toolkit';

const interactiveSlice = createSlice({
    name:         'interactive',
    initialState: {
        popup: {},
    },
    reducers: {
        setPopup: (state, action) => {
            state.popup = action.payload;
        },
    },
});

export const {
    setPopup,
} = interactiveSlice.actions;

export default interactiveSlice.reducer;
