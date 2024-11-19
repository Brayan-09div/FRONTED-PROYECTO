import axios from 'axios';


const token = JSON.pasre(localStorage.getItem('auth')); 
 
const apiClient = axios.create({
  baseURL: 'http://localhost:4500/api',
  headers: {
    "token": token.token
  }
});

export default apiClient;