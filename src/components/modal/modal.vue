<template>
    <q-btn :label="nameButton" color="green-8" @click="fixed = true" />
    <q-dialog v-model="fixed" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section class="title">
          <div class="text-h6 text-center">{{ title }}</div>
        </q-card-section>
  
        <q-separator />
  
        <q-card-section>
          <slot>
            
          </slot>
        </q-card-section>
  
        <q-separator />
  
        <q-card-actions align="right">
          <q-btn flat :label="labelClose" @click="onclickClose" color="red-8" v-close-popup />
          <q-btn flat :label="labelSend" @click="onclickSend" color="white" style="background-color: #2f7d32;" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  let fixed = ref(false);
  
  const props = defineProps({
    nameButton: {
      type: String,
      required: true,
      default: 'Boton'
    },
    title: {
      type: String,
      required: true,
      default: 'Título'
    },
    labelClose: {
      type: String,
      required: true,
      default: 'Cerrar'
    },
    labelSend: {
      type: String,
      required: true,
      default: 'Enviar'
    },
    onclickClose: {
      type: Function,
      required: true
    },
    onclickSend: {
      type: Function,
      required: true
    }
  });
  </script>
  
  <style>
  .title {
    background-color: #2f7d32;
    color: white;
  }
  
  .q-card {
    width: 400px;
  }
  </style>
  