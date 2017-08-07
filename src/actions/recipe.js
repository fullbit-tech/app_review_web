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

const createRecipe = (token, name, script) => axios.post(
    API_ROOT + '/recipe/',
    {name: name, script: script}, getConfig(token));

const editRecipe = (recipeId, token, name, script) => axios.put(
    API_ROOT + '/recipe/' + recipeId,
    {name: name, script: script}, getConfig(token));

const deleteRecipe = (recipeId, token) => axios.delete(
    API_ROOT + '/recipe/' + recipeId, getConfig(token));


export default {getRecipes, getRecipe, editRecipe, deleteRecipe, createRecipe};
