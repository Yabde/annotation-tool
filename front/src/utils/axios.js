import axios from 'axios';
import {environment} from '../environment/environment'

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    // baseURL: 'http://172.30.164.224:3001/api',
    headers: {
        'Access-Control-Allow-Origin': environment.origin,
        'Access-Control-Allow-Credentials': 'true',
        'Content-type': 'application/json',
    }
});

export default instance