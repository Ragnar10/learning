// Core
import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
    name:         'general',
    initialState: {
        loading: false,
        error:   '',
        message: '',
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = '';
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
});

export const {
    setLoading, setError, clearError, setMessage, clearMessage,
} = generalSlice.actions;

export default generalSlice.reducer;
