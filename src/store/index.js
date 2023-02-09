// Core
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import generalReducer from '../reducers/generalSlice';
import interactiveSlice from '../reducers/interactiveSlice';

export default configureStore({
    reducer: {
        general: generalReducer,
        interactive: interactiveSlice,
    },
});
