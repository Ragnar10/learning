// Core
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import generalReducer from '../reducers/generalSlice';
import interactiveSlice from '../reducers/interactiveSlice';
import authSlice from '../reducers/authSlice';
import filmsSlice from '../reducers/filmsSlice';

export default configureStore({
    reducer: {
        general:     generalReducer,
        interactive: interactiveSlice,
        auth:        authSlice,
        films:       filmsSlice,
    },
});
