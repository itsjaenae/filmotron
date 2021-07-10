import axios from 'axios';


export const getGenres = () => {
    return axios.get('api/genre');
};

