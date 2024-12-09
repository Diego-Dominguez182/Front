<template>
  <div class="crud">
    <h1>Agregar Usuarios</h1>
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Nombre" required />
      <input v-model="newUser.email" placeholder="Correo" required />
      <input v-model="newUser.password" placeholder="Contraseña" required />
      <button type="submit">Agregar Usuario</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }} - {{ user.password}}
        <button @click="editUser(user)">Editar</button>
        <button @click="deleteUser(user.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      users: [],
      newUser: { name: "", email: "", password: ""},
    };
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      const response = await axios.get("https://api.tu-servidor.com/users");
      this.users = response.data;
    },
    async addUser() {
      const response = await axios.post("https://api.tu-servidor.com/users", this.newUser);
      this.users.push(response.data);
      this.newUser = { name: "", email: "", password: "" };
    },
    async editUser(user) {
      const name = prompt("Nuevo nombre:", user.name);
      const email = prompt("Nuevo correo:", user.email);
      const password = prompt("Nueva Contraseña:", user.password);
      if (name && email && password) {
        const response = await axios.put(`https://api.tu-servidor.com/users/${user.id}`, { name, email, password });
        Object.assign(user, response.data);
      }
    },
    async deleteUser(userId) {
      await axios.delete(`https://api.tu-servidor.com/users/${userId}`);
      this.users = this.users.filter(user => user.id !== userId);
    },
  },
};
</script>

<style>
.crud {
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
  margin-bottom: 20px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #555; 
  border-radius: 5px;
  background-color: #3b3b4f; 
  color: #f0f0f0;
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
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049; 
}

ul {
  list-style: none; 
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

li button {
  background-color: #f44336; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s ease;
}

li button:hover {
  background-color: #d32f2f; 
}

li button:nth-child(1) {
  background-color: #4CAF50; 
}

li button:nth-child(1):hover {
  background-color: #388e3c; 
}
</style>
