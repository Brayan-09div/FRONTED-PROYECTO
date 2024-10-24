<template>
  <div class="home">
    <div class="cards">
      <!-- Renderizamos cada tarjeta de UserCard con v-for -->
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
</template>

import UserCard from '../components/cards/Card.vue'

// Define las tarjetas con datos (imágenes, títulos, enlaces, etc.)
const cards = [
  {
    imageSrc: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Intructor',
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
    title: 'Bitacoras',
    buttonLink: '/binnacles',
    buttonText: 'Ver'
  },
  {
    imageSrc: 'https://images.pexels.com/photos/4836585/pexels-photo-4836585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
} 
</style>

