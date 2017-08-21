import axios from 'axios';
import { TOKEN_STORAGE_KEY, API_ROOT } from 'constants/Common.js';


const getConfig  = (token) => {
  var config = {
      headers: {
        'Content-Type': 'application/json',
      },
  };
  if (token) {
    config.headers.Authorization = 'JWT ' + token;
  }
  return config;
};

const login = (email, password) => axios.post(
    API_ROOT + '/auth', {email: email, password: password});

const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const github = (token) => axios.get(
    API_ROOT + '/auth/github', getConfig(token));


export default {login, logout, github};
