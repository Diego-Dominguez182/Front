<template>
  <div class="search-container">
    <h1>Buscar Builds</h1>
    <form @submit.prevent="searchChampion">
      <label for="search">Nombre del Campeón:</label>
      <input type="text" v-model="searchQuery" id="search" required />
      <button type="submit">Buscar</button>
    </form>
      </div>

    <div class= "builds-list" v-if="builds.length > 0">
      <h2>Resultado(s)</h2>
        <ul>
          <li v-for="build in builds" :key="build.id">
            <strong>ID:</strong> {{ build.id }} - 
            <strong>Campeón:</strong> {{ build.champion_name }} <br />
            <strong>Items:</strong> 
            {{ build.items && Array.isArray(build.items) ? build.items.join(", ") : 'No items available' }}
          </li>
        </ul>
    </div>

    <div v-if="builds.length === 0 && searchQuery !== ''">
      <p class="not-found">Build no encontrada</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: "",
      builds: [],
    };
  },
  methods: {
    async searchChampion() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/builds/${this.searchQuery}/`
        );
        console.log(response.data); 

        if (response.data && Array.isArray(response.data)) {
          this.builds = response.data.map(build => {
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
        } else {
          this.builds = [];
        }
      } catch (error) {
        this.builds = [];
      }
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

.buttons-container{
  display: flex;
  justify-content: center; 
  height: 68px; 
  color: #f44336; 
  font-size: 18px;
  font-weight: bold;

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

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1e1e2f;
  color: #f0f0f0;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #2a2a3c;
  color: #f0f0f0;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
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

.not-found {
  display: flex;
  justify-content: center; 
  height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
  color: #f44336; /* Color rojo para errores */
  font-size: 18px;
  font-weight: bold;
}


</style>
