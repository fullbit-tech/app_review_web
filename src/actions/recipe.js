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
    API_ROOT + '/recipe', getConfig(token))

const getRecipe = (recipeId, token) => axios.get(
    API_ROOT + '/recipe/' + recipeId, getConfig(token));

const getRecipeDropIns = (token) => axios.get(
    API_ROOT + '/recipe/drop-ins', getConfig(token));

const createRecipe = (token, name, script, variables) => axios.post(
    API_ROOT + '/recipe',
    {name, script, variables}, getConfig(token));

const editRecipe = (recipeId, name, script, variables, token) => axios.put(
    API_ROOT + '/recipe/' + recipeId,
    {name, script, variables}, getConfig(token));

const deleteRecipe = (recipeId, token) => axios.delete(
    API_ROOT + '/recipe/' + recipeId, getConfig(token));


export default {getRecipes, getRecipe, getRecipeDropIns, editRecipe, deleteRecipe, createRecipe};
