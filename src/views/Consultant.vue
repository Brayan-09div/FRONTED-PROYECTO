<template>
    <q-layout view="hHh Lpr lff">
      <Header :toggle-drawer="toggleDrawer" />
      <q-page-container>
        <h1>hola</h1>
      </q-page-container>
    </q-layout>
  </template>

<script>
import { ref } from "vue";

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>