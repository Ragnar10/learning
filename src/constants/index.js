// Instruments
import axios from 'axios';

export const base = axios.create({
    baseURL: `${import.meta.env.VITE_API_PATH}`,
});

base.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');

    return config;
});

export const popupNames = {};
