<template>
  <q-card class="my-card">
    <q-img :src="imageSrc" class="card-image">
      <div class="text-subtitle2 absolute-top text-center" style="font-weight: bold; font-size: 15px;">
        {{ title }}
      </div>
    </q-img>
    <q-card-section>
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

/* .cards { */
  /* width: 80%;
  margin: 0 auto;
  margin-bottom: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
} */

#Ver,
#REGISTRO {
  background-color: #2F7D32 !important;
  font-size: 15px;
  font-weight: bold;
}

#REGISTRO {
  width: 35%;
}

#Ver {
  width: 55%;
}
</style>

