<template>
    <q-layout view="hHh Lpr lff">
      <Header :toggle-drawer="toggleDrawer" />
      <Sidebar v-model="drawer" />
      <q-page-container>
        <router-view />
      </q-page-container>
      <Footer />
    </q-layout>
  </template>
  
  <script setup>
  import Header from '../layouts/LayoutHeader.vue';
  import Sidebar from '../layouts/LayoutSidebar.vue';
  import Footer from '../layouts/LayoutFooter.vue';
  import { ref } from "vue";
  
  const drawer = ref(false);
  
  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };
  </script>
  