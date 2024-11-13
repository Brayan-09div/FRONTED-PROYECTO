<template>
  <!-- <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-green-8'">
    <q-toolbar>
      <q-btn flat @click="toggleDrawer" round dense icon="menu" />
      <q-toolbar-title style="font-weight: bold;">REPFORA</q-toolbar-title>
      <q-btn @click="logout">
        <q-icon name="logout" style="font-size: 25px;"></q-icon>
      </q-btn>
    </q-toolbar>
  </q-header> -->

  <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'primary'">
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      <q-toolbar-title>Header</q-toolbar-title>
      <q-btn @click="logout">
        <q-icon name="logout" style="font-size: 25px;"></q-icon>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// import {emit} from 'vue'

let drawer = ref(false);
const router = useRouter();

const toggleDrawer = () => {
  emit('toggle-drawer');
};

const logout = () => {
  router.push('/');
};


// export{ drawer };}
</script>