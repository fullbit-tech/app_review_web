import axios from 'axios';
import { API_ROOT } from '../constants/Common.js';


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

const sendSupportMessage = (message, token) => axios.get(
    API_ROOT + '/support/contact', {message}, getConfig(token))


export default { sendSupportMessage };
