<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>REPFORA</h1>
      </div>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoms2HEy0ELPrZGRr001PN2sh5sq9dU_BWQ&s"
        alt="Logo SENA" 
        class="logo"
      />
      <h2 class="login-title">LOGIN</h2>
      <hr />
      <div class="container-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="rol">Rol</label>
            <select id="rol" v-model="rol" @change="handleRoleChange" class="input-field">
              <option value="">Seleccione un rol</option>
              <option value="APRENDIZ">APRENDIZ</option>
              <option value="ADMIN">ADMIN</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
            </select>
          </div>

          <div v-if="isRoleSelected">
            <div class="form-group">
              <label for="user">Usuario</label>
              <input type="text" id="user" v-model="user" required class="input-field" />
              <label for="password">Contraseña</label>
              <input type="password" id="password" v-model="password" required class="input-field" />
            </div>
            <button type="submit" class="login-button" :disabled="isLoading">INICIAR SESIÓN</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postData } from '../services/ApiClient.js';
import { notifySuccessRequest, notifyErrorRequest, notifyWarningRequest } from '../composables/useNotify.js';

const router = useRouter();
const isRoleSelected = ref(false);

const rol = ref('');
const user = ref('');
const password = ref('');
let isLoading = ref(false);

const handleRoleChange = () => {
  isRoleSelected.value = !!rol.value; 
};

const handleSubmit = async () => {
  if (!rol.value || !user.value || !password.value) {
    notifyWarningRequest('Por favor, complete todos los campos');
    return;
  }
  isLoading.value = true; 
  try {
    const response = await postData('/Repfora/login', {
      role: rol.value,
      email: user.value,
     password: password.value
    });
    notifySuccessRequest('Inicio de sesión exitoso');
    localStorage.setItem('token', response.token); 
    router.push('/layouts');
  } catch (error) {
    console.error('Error en handleSubmit:', error);
    if (error.response && error.response.data && error.response.data.error) {
      console.log('Error del servidor:', error.response.data.error);
      notifyErrorRequest(`Error: ${error.response.data.error}`);
    } else {
      notifyErrorRequest('Error inesperado, inténtalo nuevamente');
    }
  } finally {
    isLoading.value = false; 
  }
};


const forgotPassword = () => {
  notifyWarningRequest('Funcionalidad de recuperación de contraseña aún no implementada.');
};

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