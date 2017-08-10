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

const getRepositories = (token) => axios.get(
    API_ROOT + '/repository', getConfig(token))

const linkRepository = (owner, repo, token) => axios.post(
    API_ROOT + '/repository', {owner: owner, repository: repo},
    getConfig(token));

const unlinkRepository = (owner, repo, token) => axios.delete(
    API_ROOT + '/repository/' + owner + '/' + repo, getConfig(token));


export default {getRepositories, linkRepository, unlinkRepository};
