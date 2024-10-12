
// import { defineStore } from "pinia";
// import axios from "axios";


// export const useapiClient = defineStore ('cliente', () => {
// const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token

// const apiClient = axios.create({
//     baseURL: 'http://localhost:4500/api',
//     headers: {
//         "token": token
//     }
// });

// return {
//     apiClient
// }
// })

import { defineStore } from "pinia";
import axios from "axios";

export const useApiClient = defineStore('cliente', () => {
  const token = localStorage.getItem('token');

  const apiClient = axios.create({
    baseURL: 'http://localhost:4500/api',
    headers: {
      "token": token
    },
  });

  return {
    apiClient,
    async post(url, data) {
        return await apiClient.post(url, data);
  }
}
});