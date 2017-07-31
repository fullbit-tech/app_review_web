import axios from 'axios';
import { TOKEN_STORAGE_KEY, API_ROOT } from '../constants/common.js';


const getConfig  = (auth) => {
  var accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  var config = {
      headers: {
        'Content-Type': 'application/json',
      },
  };
  if (auth) {
    config.headers.Authorization = 'JWT ' + accessToken;
  }
  return config;
};

const getUser = () => axios.get(API_ROOT + '/user/', getConfig(true));
const register = (email, password) => axios.post(API_ROOT + '/user/register',
    {email: email, password: password}, getConfig());


export default {register, getUser};
