// Api
import { api } from '../api';
// Actions
import { setActivity } from '../reducers/dataSlice';

export const actions = {
    getActivity: (navigate) => async (dispatch) => {
        try {
            const response = await api.getActivity();

            console.log(response);

            if (response.status === 200) {
                if (response.data) {
                    dispatch(setActivity(response.data));
                    navigate('/top10films');
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
};
