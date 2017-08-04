import axios from 'axios';
import { API_ROOT } from '../constants/common.js';


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

const getUser = (token) => axios.get(API_ROOT + '/user/', getConfig(token));
const register = (email, password) => axios.post(API_ROOT + '/user/register',
    {email: email, password: password}, getConfig());


export default {register, getUser};
