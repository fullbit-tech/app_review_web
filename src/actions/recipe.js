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

const getRecipes = (token) => axios.get(
    API_ROOT + '/recipe/', getConfig(token))

const getRecipe = (recipeId, token) => axios.get(
    API_ROOT + '/recipe/' + recipeId, getConfig(token));


export default {getRecipes, getRecipe};
