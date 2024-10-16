<template>
  <Header title="Bitacoras"></Header>

  <!-- Usando el modal con inputs dentro del slot -->
  <ModalDialog title="Nuevo Registro" nameButton="Abrir Modal" labelClose="Cancelar" labelSend="Guardar"
    :onclickClose="cerrarModal" :onclickSend="guardarDatos">

    <q-input v-model="nombre" label="Nombre" filled /> <br>
    <q-input v-model="apellido" label="Apellido" filled /> <br>
    <q-input v-model="email" label="Email" filled /> <br>

  </ModalDialog>
</template>

<script setup>
import { ref } from 'vue';
import ModalDialog from '../components/modal/modal.vue';
import Header from '../components/header/Header.vue';

const nombre = ref('pablo')
const apellido = ref('lopez')
const email = ref('pablo@example.com')


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
