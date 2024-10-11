<template>
  <Header title="Aprendices"></Header>
  <div>
    <h2>Datos de Aprendices</h2>
    <ul>
      <li v-for="aprendiz in aprendices" :key="aprendiz.id">{{ aprendiz.name }}</li>
    </ul>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '../components/header/header.vue';
import { getData } from '../services/ApiClient.js'; 
const aprendices = ref([]); 


const fetchAprendices = async () => {
  try {
    const url = '/api/aprendices'; 
    aprendices.value = await getData(url); 
  } catch (error) {
    console.error('Error al obtener los aprendices:', error);
  }
};
       


onMounted(() => {
  fetchAprendices();
});
</script>