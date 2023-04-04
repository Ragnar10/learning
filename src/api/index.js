// Instruments
import axios from 'axios';

const base = axios.create({
    baseURL: `${import.meta.env.VITE_API_PATH}`,
});

export const api = {
    getActivity: () => {
        return base.get('/activity');
    },
};

