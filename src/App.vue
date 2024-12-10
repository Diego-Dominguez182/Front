<template>
  <div>
    <div v-if="!isLoggedIn">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Correo</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>

    <div v-if="isLoggedIn">
      <h1>Menú Principal</h1>
      <div class="buttons-container">
        <button @click="goTo('getBuilds')">Mostrar Builds</button>
        <button @click="goTo('crear')">Crear Build</button>
        <button @click="goTo('byID')">Buscar por nombre</button>
        <button @click="goTo('modificar')">Modificar Build</button>
        <button @click="goTo('eliminar')">Eliminar Build</button>
        <button @click="logout">Cerrar Sesión</button>
      </div>
    </div>

    <router-view /> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      email: "",
      password: "",
      isLoggedIn: false,
    };
  },
  methods: {
  async login() {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email: this.email,
        password: this.password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        this.isLoggedIn = true;


      }
    } catch (error) {
      alert("Error en las credenciales");
    }
  },

  goTo(route) {
    this.$router.push({ name: route });
  },

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    window.location.href = 'http://localhost:8080/';  }
},

  mounted() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.$router.push({ name: 'getBuilds' });
    }
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #1e1e2f;
  color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #2a2a3c;
  border-radius: 8px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #ffffff;
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
  font-size: 16px;
  transition: background-color 0.3s ease;
  min-width: 150px;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 20px;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  padding: 20px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  min-width: 150px;
  text-align: center;
}

button:hover {
  background-color: #45a049;
}
</style>
