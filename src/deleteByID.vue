<template>
  <div class="delete-container">
    <h1>Eliminar Build</h1>
    <input
      type="text"
      v-model="championIdToDelete"
      placeholder="Ingresa ID de la build a eliminar"
    />
    <button @click="deleteChampion">Eliminar</button>
  </div>
</template>

<script>
import axios from 'axios'; 
export default {
  data() {
    return {
      championIdToDelete: "", 
    };
  },
 methods: {
  async deleteChampion() {
    const id = this.championIdToDelete.trim(); 
    if (!id) {
      alert("Por favor ingresa un ID válido.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/builds/delete/${id}/`);
      alert(`Build con ID ${id} eliminada con éxito.`);
      this.championIdToDelete = ""; 
    } catch (error) {
      console.error(error); 
      alert("Hubo un error al eliminar la build. Verifica el ID.");
    }
  },
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

.delete-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e2f;
  color: #f0f0f0;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #2a2a3c;
  color: #f0f0f0;
  width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #e53935; 
  color: white;
  border: none;
  border-radius: 5px; 
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f; 
}
</style>
