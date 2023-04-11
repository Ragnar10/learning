// Constants
import { base } from '../constants';

export const filmsApi = {
    getFilms: () => {
        return base.get('/films');
    },
};

