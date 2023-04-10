// Constants
import { base } from '../constants';

export const authApi = {
    signUp: (data) => {
        return base.post('/signup', data);
    },
    signIn: (data) => {
        return base.post('/signin', data);
    },
};

