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

const getInstances = (token) => axios.get(
    API_ROOT + '/instance', getConfig(token))

const getInstance = (owner, repo, pull, token) => axios.get(
    API_ROOT + '/pull-request/' + owner + '/' + repo + '/' + pull,
    getConfig(token));

const startInstance = (owner, repo, pull, token, size, recipe) => axios.post(
    API_ROOT + '/pull-request/' + owner + '/' + repo + '/' + pull,
    {recipe_id: recipe, instance_size: size}, getConfig(token));

const stopInstance = (owner, repo, pull, recipe, token) => axios.delete(
    API_ROOT + '/pull-request/' + owner + '/' + repo + '/' + pull,
    getConfig(token));

const terminateInstance = (owner, repo, pull, recipe, token) => axios.delete(
    API_ROOT + '/pull-request/' + owner + '/' + repo + '/' + pull + '?terminate=true',
    getConfig(token));


export default {getInstances, getInstance, startInstance, stopInstance, terminateInstance};
