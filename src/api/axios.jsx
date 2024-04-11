import axios from 'axios';

export default axios.create({
    baseURL: 'https://server.narratives.es:8000/'
});
