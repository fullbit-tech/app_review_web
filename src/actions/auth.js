import axios from 'axios';
import { TOKEN_STORAGE_KEY, API_ROOT } from '../constants/common.js';



const setAccessToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

}

const login = (email, password) => axios.post(
    API_ROOT + '/auth', {email: email, password: password});


export default {setAccessToken, login};
