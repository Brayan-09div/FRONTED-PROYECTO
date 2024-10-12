// import { useapiClient } from "../plugins/axios.js";  // Importa el cliente de axios

// // Función GET
// export async function getData(url, params = {}) {
//     const { apiClient } = useapiClient();
//     try {
//         const response = await apiClient.get(url, { params },);
//         return response.data;  // Devuelve los datos de la respuesta
//     } catch (error) {
//         console.error('Error en la petición GET:', error);
//         throw error;  // Opcionalmente, puedes manejar el error o lanzarlo
//     }
// }
// // Función POST
// export async function postData(url, data) {
//     // const { apiClient } = useapiClient();  // Obtienes directamente apiClient
//     const apiClientStore = useapiClient();
//     try {
//         const response = await apiClientStore.apiClient.post(url, data);  // Usas apiClient directamente
//         return response.data;  // Devuelve los datos de la respuesta
//     } catch (error) {
//         // console.error('Error en la petición POST:', error);
//         throw error;
//     }
// }
// // Función PUT
// export async function putData(url, data) {
//     const { apiClient } = useapiClient();
//     try {
//         const response = await apiClient.put(url, data);
//         return response.data;  // Devuelve los datos de la respuesta
//     } catch (error) {
//         console.error('Error en la petición PUT:', error);
//         throw error;
//     }
// }



// // import { useApiClient } from '../stores/apiClientStore';
// import { useApiClient } from '../plugins/axios';

// export async function postData(url, data) {
//   const apiClientStore = useApiClient();
//   try {
//     const response = await apiClientStore.apiClient.post(url, data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }


import { useApiClient } from '../plugins/Axios.js';

export async function postData(url, data) {
  const apiClientStore = useApiClient();
  try {
    const response = await apiClientStore.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error en postData:', error);
    throw error;
  }
}