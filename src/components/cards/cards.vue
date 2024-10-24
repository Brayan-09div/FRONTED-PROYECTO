<template>
  <q-card class="my-card">
    <q-img :src="imageSrc" class="card-image" style="height: 350px; object-fit: cover;">
      <div class="text-subtitle2 absolute-top text-center" style="font-weight: bold; font-size: 15px;">
        {{ title }}
      </div>
    </q-img>
    <q-card-section class="card-section">
      <q-btn id="Ver" color="primary" clickable :to="buttonLink" v-ripple>
        {{ buttonText }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
    imageSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'USUARIOS'
    },
    buttonLink: {
      type: String,
      default: '/usuario'
    },
    buttonText: {
      type: String,
      default: 'Ver'
    }
})
</script>

<style scoped>
.my-card {
  height: 300px; 
  display: flex;
  flex-direction: column; 
}

.card-section {
  flex-grow: 1; 
}

#Ver {
  background-color: #2F7D32 !important;
  font-size: 15px;
  font-weight: bold;
  width: 55%;
  margin: 0 auto; 
}
</style>


