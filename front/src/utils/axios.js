import axios from 'axios';
import {environment} from '../environment/environment'

const token = localStorage.getItem('token');
const URL = process.env.NODE_ENV !== 'production' ? environment.api : process.env.REACT_APP_URL;
const ORIGIN = process.env.NODE_ENV !== 'production' ? environment.origin : process.env.REACT_APP_ORIGIN;

const instance = axios.create({
    baseURL: URL,
    // baseURL: 'http://172.30.164.224:3001/api',
    headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': ORIGIN,
        'Access-Control-Allow-Credentials': 'true',
        'Content-type': 'application/json',
    }
});

export default instance