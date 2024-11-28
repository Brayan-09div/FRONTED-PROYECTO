import axios from 'axios';


const token = JSON.parse(localStorage.getItem('auth')); 
 
const apiClient = axios.create({
  baseURL: 'http://localhost:4500/api',
  // baseURL: 'https://etapas-practicas-ep.onrender.com/api',
  headers: {
    "token": token.token
  }
});

export default apiClient;