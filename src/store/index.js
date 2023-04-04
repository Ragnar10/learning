// Core
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import generalReducer from '../reducers/generalSlice';
import interactiveSlice from '../reducers/interactiveSlice';
import dataSlice from '../reducers/dataSlice';

export default configureStore({
    reducer: {
        general:     generalReducer,
        interactive: interactiveSlice,
        data:        dataSlice,
    },
});
