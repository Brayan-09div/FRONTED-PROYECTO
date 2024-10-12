<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>REPFORA</h1>
      </div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoms2HEy0ELPrZGRr001PN2sh5sq9dU_BWQ&s"
        alt="Logo SENA" class="logo">
      <h2 class="login-title">LOGIN</h2>
      <hr>
      <div class="container-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="rol">Rol</label>
            <!-- <select id="rol" v-model="formData.rol"   @change="handleRoleChange" class="input-field">
            <option value="CONSULTOR">APRENDIZ</option>
            <option value="ADMIN">ADMIN</option>
            <option value="ADMIN">INSTRUCTOR</option>
          </select> -->
            <select id="rol" v-model="formData.rol" @change="handleRoleChange" class="input-field">
              <option value="">Seleccione un rol</option>
              <option value="APRENDIZ">APRENDIZ</option>
              <option value="ADMIN">ADMIN</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
            </select>
          </div>
          <div v-if="isRoleSelected">
            <div class="form-group">
              <label for="user">Usuario</label>
              <input type="text" id="user" v-model="formData.user" required class="input-field" />
              <label for="password">Contraseña</label>
              <input type="password" id="password" v-model="formData.password" required class="input-field" />
            </div>
            <button @click="handleSubmit" type="submit" class="login-button">INICIAR SESIÓN</button>
          </div>
        </form>
      </div>
      <p>
        <a href="#" @click="forgotPassword" class="forgot-password">Olvidé mi contraseña</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { postData } from '../services/ApiClient.js';
import { notifySuccessRequest, notifyErrorRequest, notifyWarningRequest } from '../composables/useNotify.js';
const router = useRouter();
const isRoleSelected = ref(false)

// const handleRoleChange = () => {
//   isRoleSelected.value = !!rol.value;
// }
const handleRoleChange = () => {
  isRoleSelected.value = !!formData.value.rol;
}
const formData = ref({
  rol: '',
  user: '',
  password: ''
});

// const success = ref(false);
// const error = ref(null);

// const handleSubmit = async () => {
//   try {
//     const response = await postData('/api/Repfora/login', formData.value);
//     console.log('Respuesta del servidor:', response);
//     notifySuccessRequest('Inicio de sesión exitoso');
//   } catch (error) {
//      // Si el backend envía el error en error.response.data
//      if (error.response && error.response.data && error.response.data.error) {
//       console.log('Error del servidor:', error.response.data.error);
//       notifyErrorRequest(`Error: ${error.response.data.error}`);
//     } else {
//       // Si no es un error del servidor o no se obtuvo una respuesta
//       console.log('Error general:', error.message);
//       notifyErrorRequest('Error inesperado, inténtalo nuevamente');
//     }
//   }
// };

let isLoading = ref(false);

// const handleSubmit = async () => {
//   if (!formData.value.rol || !formData.value.user || !formData.value.password) {
//     notifyWarningRequest('Por favor, complete todos los campos');
//     return;
//   }

//   isLoading.value = true;
//   try {
//     console.log('Enviando datos:', formData.value);
//     const response = await postData('/api/Repfora/login', formData.value);
//     console.log('Respuesta del servidor:', response);
//     notifySuccessRequest('Inicio de sesión exitoso');
//     // Aquí puedes agregar la lógica para manejar la sesión iniciada
//     // Por ejemplo, guardar el token en localStorage y redirigir al usuario
//     localStorage.setItem('token', response.token);
//     router.push('/dashboard'); // Asume que tienes una ruta '/dashboard'
//   } catch (error) {
//     if (error.response && error.response.data && error.response.data.error) {
//       console.log('Error del servidor:', error.response.data.error);
//       notifyErrorRequest(`Error: ${error.response.data.error}`);
//     } else if (error.request) {
//       console.log('No se recibió respuesta:', error.request);
//       notifyErrorRequest('No se recibió respuesta del servidor');
//     } else {
//       console.log('Error general:', error.message);
//       notifyErrorRequest('Error inesperado, inténtalo nuevamente');
//     }
//   } finally {
//     isLoading.value = false;
//   }
// };

const handleSubmit = async () => {
  if (!formData.value.rol || !formData.value.user || !formData.value.password) {
    notifyWarningRequest('Por favor, complete todos los campos');
    return;
  }

  isLoading.value = true;
  try {
    console.log('Enviando datos:', formData.value);
    const response = await postData('/Repfora/login', formData.value);
    console.log('Respuesta del servidor:', response);
    notifySuccessRequest('Inicio de sesión exitoso');
    localStorage.setItem('token', response.token);
    router.push('/dashboard');
  } catch (error) {
    console.error('Error en handleSubmit:', error);
    if (error.response && error.response.data && error.response.data.error) {
      console.log('Error del servidor:', error.response.data.error);
      notifyErrorRequest(`Error: ${error.response.data.error}`);
    } else if (error.request) {
      console.log('No se recibió respuesta:', error.request);
      notifyErrorRequest('No se recibió respuesta del servidor');
    } else {
      console.log('Error general:', error.message);
      notifyErrorRequest('Error inesperado, inténtalo nuevamente');
    }
  } finally {
    isLoading.value = false;
  }
};
// const Salir = async () => {
//   router.replace("/")
// }
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-container p {
  margin-top: 10px !important;
  margin-bottom: 20px !important;
  text-decoration: underline;
}

.container-form {
  padding: 20px !important;
}

.login-box {
  width: 650px;
  /* padding: 20px; */
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-header {
  background-color: #2F7D32;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.login-header h1 {
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 0;
}

.logo {
  width: 100px;
  margin: 20px 0;
}

.login-title {
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold !important;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.login-button {
  width: 30%;
  padding: 10px;
  background-color: #2F7D32;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #246024;
  font-weight: 600;
}

.forgot-password {
  color: #2F7D32;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
  font-weight: bold !important;
}
</style>