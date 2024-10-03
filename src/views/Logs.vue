corregido <template>
  <div class="container">
    <div class="login-form">
      <h1>REPFORA</h1>
      <img src="https://www.sena.edu.co/Portals/0/Images/Logo%20Sena%20Nuevo%2001.png" alt="SENA Logo" class="logo">
      <h2>LOGIN</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="rol">Rol</label>
          <select id="rol" v-model="rol">
            <option value="CONSULTOR">CONSULTOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        <a href="#" @click="forgotPassword">Olvidé mi contraseña</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rol = ref('CONSULTOR')
const password = ref('')

const handleSubmit = () => {
  // TODO: Implementar lógica de inicio de sesión
  console.log('Inicio de sesión con rol:', rol.value, 'y contraseña:', password.value)
}

const forgotPassword = () => {
  // TODO: Implementar lógica para recuperar contraseña
  console.log('Olvidé mi contraseña')
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  border: 1px solid #ddd;
  padding: 30px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 150px;
  margin: 20px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>