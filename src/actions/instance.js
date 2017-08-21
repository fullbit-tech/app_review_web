import axios from 'axios';
import { API_ROOT } from '../constants/Common.js';


const getConfig  = (token, params={}) => {
  var config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: params,
  };
  if (token) {
    config.headers.Authorization = 'JWT ' + token;
  }
  return config;
};

const getInstances = (token, params={}) => axios.get(
    API_ROOT + '/instance', getConfig(token, params))

const getInstance = (instance, token) => axios.get(
    API_ROOT + '/instance' + intance.id,
    getConfig(token));

const startInstance = (instance, token) => axios.post(
    API_ROOT + '/instance/' + instance.id,
    instance, getConfig(token));

const stopInstance = (instance, token) => axios.delete(
    API_ROOT + '/instance/' + instance.id,
    getConfig(token));

const terminateInstance = (instance, token) => axios.delete(
    API_ROOT + '/instance/' + instance.id + '?terminate=true',
    getConfig(token));


export default {getInstances, getInstance, startInstance, stopInstance, terminateInstance};
