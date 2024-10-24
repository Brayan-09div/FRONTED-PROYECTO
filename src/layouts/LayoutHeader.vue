


<template>
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-green-8'">
      <q-toolbar>
        <q-btn flat @click="toggleDrawer" round dense icon="menu" />
        <q-toolbar-title style="font-weight: bold;">REPFORA</q-toolbar-title>
        <q-btn @click="logout">
          <q-icon name="logout" style="font-size: 25px;"></q-icon>
        </q-btn>
      </q-toolbar>
    </q-header>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const toggleDrawer = (drawer) => {
    drawer.value = !drawer.value;
  };
  
  const logout = () => {
    router.push('/');
  };
  </script>
  