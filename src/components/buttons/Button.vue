<template>
   <q-btn id="buttonbasic" color="green-8" @click="fixed = true" class="q-mb-md">
    <q-icon name="unarchive" />
    <span style="font-weight: bold !important; margin-left: 5px;">{{ nameButton }}</span>
  </q-btn>
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
  