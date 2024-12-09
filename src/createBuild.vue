<template>
  <div class="form-container">
    <h1>Agregar Build</h1>
    <form @submit.prevent="saveChampionDetails">
      <div>
        <label for="champion_name">Nombre del Campeón</label>
        <input type="text" v-model="champion_name" required />
      </div>
      <div>
        <label for="item_1">Item 1 </label>
        <input type="text" v-model="item_1" />
      </div>
      <div>
        <label for="item_2">Item 2 </label>
        <input type="text" v-model="item_2" />
      </div>
      <div>
        <label for="item_3">Item 3 </label>
        <input type="text" v-model="item_3" />
      </div>
      <div>
        <label for="item_4">Item 4 </label>
        <input type="text" v-model="item_4" />
      </div>
      <div>
        <label for="item_5">Item 5 </label>
        <input type="text" v-model="item_5" />
      </div>
      <div>
        <label for="item_6">Item 6 </label>
        <input type="text" v-model="item_6" />
      </div>
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      champion_name: "",
      item_1: "",
      item_2: "",
      item_3: "",
      item_4: "",
      item_5: "",
      item_6: "",
    };
  },
  methods: {
    async saveChampionDetails() {
      const championData = {
        champion_name: this.champion_name,
        item_1: this.item_1,
        item_2: this.item_2,
        item_3: this.item_3,
        item_4: this.item_4,
        item_5: this.item_5,
        item_6: this.item_6,
      };

      try {
        const response = await axios.post('http://127.0.0.1:8000/builds/createBuild', championData);
        alert('Build guardada con éxito');
        console.log(response.data); 
        this.item_1 = '',
        this.item_2 = '',
        this.item_3 = '',
        this.item_4 = '',
        this.item_5 = '',
        this.item_6 = '',
        this.champion_name = ''
      } catch (error) {
        alert('Error al guardar la build');
        console.error(error.response.data); 
      }
    },
  },
};
</script>

<style>
.form-container {
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
