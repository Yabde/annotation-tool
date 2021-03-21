import axios from '../utils/axios';
import { validateEmail, validatePwd } from '../utils/checks';

export async function login(email: string, password: string) {
  let credentials = { email: email, pwd: password };
  if (!validateCredentials(credentials)) return Promise.reject(false);

  return axios
    .post('/login', credentials)
    .then((result: any) => {
      if (result.data !== null) {
        console.log('result : ', result);
        const user = result.data;
        // localStorage.setItem('user', user);
        localStorage.setItem('token', user.token);
        return user;
      } else {
        return Promise.reject('User not found');
      }
    })
    .catch((error) => {
      return Promise.reject('User not found');
    });
}

export async function getAuthenticatedUser() {
  // const user = localStorage.getItem('user');
  // return user
  console.log('Get Authenticated User');
  const rawToken = localStorage.getItem('token');
  let user: any;
  //   if (!rawToken) return Promise.resolve((user = 'null'));
  if (!rawToken) return Promise.reject(null);

  user = parseJWT(rawToken);
  console.log('authenticated user : ', user);
  return user;
}

export function logout() {
  localStorage.removeItem('token');
}

// export function getUser(id: string): Promise<any> {
//   console.log('getUser');
//   return axios.get(`users/${id}`);
// }

function parseJWT(token: string) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function validateCredentials(credentials: any) {
  if (!credentials || Object.keys(credentials).length === 0) {
    return false;
  }
  if (!credentials.email || !credentials.pwd) {
    return false;
  }
  return validatePwd(credentials.pwd) && validateEmail(credentials.email);
}
