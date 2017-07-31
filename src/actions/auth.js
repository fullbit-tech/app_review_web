import axios from 'axios';
import { TOKEN_STORAGE_KEY, API_ROOT } from '../constants/common.js';


const login = (email, password) => axios.post(
    API_ROOT + '/auth', {email: email, password: password});

const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};


export default {login, logout};
