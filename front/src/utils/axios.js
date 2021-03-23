import axios from 'axios';
import {environment} from '../environment/environment'

const token = localStorage.getItem('token');
const URL = process.env.NODE_ENV !== 'production' ? environment.api : process.env.REACT_APP_URL;
console.log('URL : ', URL);

const instance = axios.create({
    baseURL: URL,
    // baseURL: 'http://172.30.164.224:3001/api',
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': environment.origin,
        'Access-Control-Allow-Credentials': 'true',
        'Content-type': 'application/json',
    }
});

export default instance