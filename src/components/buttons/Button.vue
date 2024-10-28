<template>

    <q-btn push color="green-8" @click="onclickButton" :label="nameButton" />
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    nameButton: {
      type: String,
      required: true,
      default:'Button'
    },
    onclickButton:{
      type:Function,
      required: true
    }
  })
  </script>
  