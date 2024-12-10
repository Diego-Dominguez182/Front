<template>
  <div class="form-container">
    <div v-if="!selectedBuildId">
      <h1>Buscar Build</h1>
      <form @submit.prevent="searchBuild">
        <div>
          <label for="search_id">ID de la Build</label>
          <input type="text" v-model="searchId" required />
        </div>
        <button type="submit">Buscar</button>
      </form>
    </div>

    <div v-else>
      <h1>Actualizar Build</h1>
      <form @submit.prevent="updateBuild">
        <div>
          <label for="champion_name">Nombre del Campeón</label>
          <input type="text" v-model="champion_name" required />
        </div>
        <div>
          <label for="item_1">Item 1</label>
          <input type="text" v-model="item_1" />
        </div>
        <div>
          <label for="item_2">Item 2</label>
          <input type="text" v-model="item_2" />
        </div>
        <div>
          <label for="item_3">Item 3</label>
          <input type="text" v-model="item_3" />
        </div>
        <div>
          <label for="item_4">Item 4</label>
          <input type="text" v-model="item_4" />
        </div>
        <div>
          <label for="item_5">Item 5</label>
          <input type="text" v-model="item_5" />
        </div>
        <div>
          <label for="item_6">Item 6</label>
          <input type="text" v-model="item_6" />
        </div>
        <button type="submit">Actualizar</button>
        <button type="button" @click="clearSearch">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchId: "",
      selectedBuildId: null,
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
    async searchBuild() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/builds/getBuildById/${this.searchId}`
        );
        const build = response.data;
        this.selectedBuildId = build.id;
        this.champion_name = build.champion_name;
        this.item_1 = build.item_1 || "";
        this.item_2 = build.item_2 || "";
        this.item_3 = build.item_3 || "";
        this.item_4 = build.item_4 || "";
        this.item_5 = build.item_5 || "";
        this.item_6 = build.item_6 || "";
      } catch (error) {
        alert("Build no encontrada");
        console.error(error.response?.data || error);
      }
    },
    async updateBuild() {
      const buildData = {
        champion_name: this.champion_name,
        item_1: this.item_1,
        item_2: this.item_2,
        item_3: this.item_3,
        item_4: this.item_4,
        item_5: this.item_5,
        item_6: this.item_6,
      };

      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/builds/updateBuild/${this.selectedBuildId}`,
          buildData
        );
        alert("Build actualizada con éxito");
        console.log(response.data);
        this.clearSearch();
      } catch (error) {
        alert("Error al actualizar la build");
        console.error(error.response?.data || error);
      }
    },
    clearSearch() {
      this.selectedBuildId = null;
      this.searchId = "";
      this.champion_name = "";
      this.item_1 = "";
      this.item_2 = "";
      this.item_3 = "";
      this.item_4 = "";
      this.item_5 = "";
      this.item_6 = "";
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
