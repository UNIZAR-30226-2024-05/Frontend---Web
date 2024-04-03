import axios from 'axios';

export default axios.create({
    baseURL: 'https://narratives-backend.azurewebsites.net'
});
