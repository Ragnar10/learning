// Api
import { filmsApi } from '../api';
// Actions
import {
    setLoading, setError, clearError,
} from '../reducers/generalSlice';
import { setFilms } from '../reducers/filmsSlice';

export const filmsActions = {
    getFilms: () => async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await filmsApi.getFilms();

            if (response.status === 200) {
                if (response.data) {
                    dispatch(setFilms(response.data));
                    dispatch(clearError());
                    dispatch(setLoading(false));
                }
            }
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError(error.response.data.message));
        }
    },
};
