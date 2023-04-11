// Api
import { authApi } from '../api';
// Actions
import {
    setLoading, setError, clearError, setMessage, clearMessage,
} from '../reducers/generalSlice';
import { setUser } from '../reducers/authSlice';

export const authActions = {
    signUp: (data, navigate) => async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await authApi.signUp(data);

            if (response.status === 200) {
                if (response.data) {
                    dispatch(clearError());
                    dispatch(clearMessage());
                    dispatch(setLoading(false));
                    dispatch(setMessage('Реєстрація пройшла успішно'));

                    return navigate('/signin');
                }
            }
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError(error.response.data.message));
        }
    },

    signIn: (data, navigate) => async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await authApi.signIn(data);

            if (response.status === 200) {
                if (response.data) {
                    localStorage.setItem('token', response.data.token);
                    dispatch(setUser(response.data));
                    dispatch(clearError());
                    dispatch(setLoading(false));

                    return navigate('/films');
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
