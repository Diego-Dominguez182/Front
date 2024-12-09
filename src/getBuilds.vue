<template>
  <div class="builds-list" v-if="isLoggedIn">
    <h1>Lista de Builds</h1>
    <ul>
      <li v-for="build in builds" :key="build.id">
        <strong>ID:</strong> {{ build.id }} - 
        <strong>Campeón:</strong> {{ build.champion_name }} <br />
        <strong>Items:</strong> 
        {{ build.items && Array.isArray(build.items) ? build.items.join(", ") : 'No items available' }}
      </li>
    </ul>
  </div>

  <div v-else>
    <p>No has iniciado sesión. Por favor, ingresa primero.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      builds: [],
      isLoggedIn: false,
    };
  },
methods: {
  async getBuilds() {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        alert("No estás autenticado.");
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/builds", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const transformedBuilds = response.data.map(build => {
        const items = [
          build.item_1,
          build.item_2,
          build.item_3,
          build.item_4,
          build.item_5,
          build.item_6
        ];
        return {
          id: build.id,
          champion_name: build.champion_name,
          items: items.filter(item => item)
        };
      });

      this.builds = transformedBuilds; 
    } catch (error) {
      alert("Hubo un problema al obtener las builds");
      console.error(error);
    }
  },
},

  mounted() {
    const token = localStorage.getItem("auth_token");
    if (token) {
      this.isLoggedIn = true; 
      this.getBuilds(); 
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
}

.builds-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1e1e2f;
  color: #f0f0f0;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80%;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #2a2a3c;
  color: #f0f0f0;
}

li strong {
  color: #4CAF50;
}
</style>
