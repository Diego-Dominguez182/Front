<template>
  <div>
    <div class="login">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Correo </label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Contraseña </label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
  try {
    await axios.post("http://127.0.0.1:8000/login/", {
      email: this.email,
      password: this.password,
    });
    this.$router.push("/mainScreen");
  } catch (error) {
    alert("Error en las credenciales");
  }
}

  },
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e2f;
  color: #f0f0f0;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #ffffff;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #555; 
  border-radius: 5px;
  background-color: #2a2a3c; 
  color: #f0f0f0; 
  text-align: center;
  width: 100%;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
