import axios from 'axios';

const token = localStorage.getItem('token'); 
 
const apiClient = axios.create({
  baseURL: 'http://localhost:4500/api',
  headers: {
    "token": token
  }
});

export default apiClient;