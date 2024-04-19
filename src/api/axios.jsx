import axios from 'axios';

export default axios.create({
    baseURL: 'https://server.narratives.es',
    credentials: true
});
