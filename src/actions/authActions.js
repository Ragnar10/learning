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
                    console.log(response.data);

                    dispatch(clearError());
                    dispatch(clearMessage());
                    dispatch(setLoading(false));
                    dispatch(setMessage('Реєстрація пройшла успішно'));

                    return  navigate('/signin');
                }
            }

            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Щось пішло не так, спробуйте ще раз'));
        } catch (error) {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(clearError());
            dispatch(setError('Щось пішло не так, спробуйте ще раз'));
        }
    },

    signIn: (data, navigate) => async (dispatch) => {
        try {
            const response = await authApi.signIn(data);

            if (response.status === 200) {
                if (response.data) {
                    dispatch(setUser(response.data));
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
};
