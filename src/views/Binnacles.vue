<template>
  <Header title="Bitacoras"></Header>
  <!-- <Table></Table> -->
</template>

<script setup>
import { ref } from 'vue';
import ModalDialog from '../components/modal/modal.vue';
import Header from '../components/header/Header.vue';
import Dialog from '../components/modal/dialog.vue';
// import Table from '../components/tables/tableSelect.vue';
const nombre = ref('pablo')
const apellido = ref('lopez')
const email = ref('pablo@example.com')

const rows = ref([])
const colunms = ref([
  
])
const cerrarModal = () => {
  console.log('Modal cerrado');
};

const guardarDatos = () => {
  console.log('Datos guardados:');
};

</script>

<style>
/* Estilos adicionales si es necesario */
</style>
