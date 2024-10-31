<template>
  <q-layout view="hHh Lpr lff">
    <Header :toggle-drawer="toggleDrawer" />
    <Sidebar v-model="drawer" />
    <q-page-container>
      <div class="home">
        <h1 class="titleHome">SEGUIMIENTO ETAPAS PRODUCTIVAS ASIGNADAS Y REGISTRO DE HORAS LABORADAS</h1>
        <div class="cards">
          <UserCard
            v-for="(Card, index) in cards"
            :key="index"
            :imageSrc="Card.imageSrc"
            :title="Card.title"
            :buttonLink="Card.buttonLink"
            :buttonText="Card.buttonText"
          />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

import UserCard from '../components/cards/Card.vue'

// Define las tarjetas con datos (imágenes, títulos, enlaces, etc.)
<script setup>
import UserCard from '../components/cards/cards.vue';
import { ref } from "vue";

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const cards = [
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Instructor',
    buttonLink: '/instructor',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Aprendices',
    buttonLink: '/apprentice',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Asignación',
    buttonLink: '/assignment',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/313691/pexels-photo-313691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Seguimiento',
    buttonLink: '/followup',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/7693107/pexels-photo-7693107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Bitácoras',
    buttonLink: '/binnacles',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/4836585/pexels-photo-4836585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Informes',
    buttonLink: '/binnacles',
    buttonText: 'Ver'
  }
];
</script>

<style scoped>
.home{
  text-align: center;
  align-items: center;
  justify-content: center;
}

.cards { 
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: stretch; 
} 

.titleHome{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
  width: 100%;
  line-height: 1.2;
  padding-top: 30px;
  text-align: center !important;
}
</style>

