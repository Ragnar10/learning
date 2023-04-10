// Api
import { authApi } from '../api';
// Actions
import { setUser } from '../reducers/authSlice';

export const authActions = {
    signUp: (data, navigate) => async () => {
        try {
            const response = await authApi.signUp(data);

            if (response.status === 200) {
                if (response.data) {
                    console.log(response.data);
                    navigate('/signin');
                }
            }
        } catch (error) {
            console.log(error);
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
