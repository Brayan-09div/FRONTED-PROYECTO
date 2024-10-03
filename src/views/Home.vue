
<template>
  <div class="home">
    <div class="cards">
      <!-- Renderizamos cada tarjeta de UserCard con v-for -->
      <UserCard
        v-for="(card, index) in cards"
        :key="index"
        :imageSrc="card.imageSrc"
        :title="card.title"
        :buttonLink="card.buttonLink"
        :buttonText="card.buttonText"
      />
    </div>
  </div>
</template>

<script setup>
// Importa el componente UserCard
// import  from '../components/cards/card.vue'
import UserCard from '../components/cards/card.vue'

// Define las tarjetas con datos (imágenes, títulos, enlaces, etc.)
const cards = [
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Intructor',
    buttonLink: '/instructor',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Aprendices',
    buttonLink: '/apprentice',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Asignación',
    buttonLink: '/assignment',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Seguimiento',
    buttonLink: '/followup',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Bitacoras',
    buttonLink: '/binnacles',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Informes',
    buttonLink: '/binnacles',
    buttonText: 'Ver'
  }
]
</script>

<style scoped>
.cards { 
   width: 80%;
  margin: 0 auto;
  margin-bottom: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
} 
</style>
