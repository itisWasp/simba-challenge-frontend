import axios from 'axios';

export default axios.create({
    baseUrl: 'https://simba-challenge-backend.herokuapp.com'
})