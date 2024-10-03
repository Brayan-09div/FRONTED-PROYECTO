<template>
      <Header title="Seguimiento"></Header>
  <Button label="Prueba" :onclickButton="Search" ></Button>
  </template>
  
  
  <script setup>
  import Button from '../components/buttons/buttons.vue'
  import Header from '../components/header/header.vue';

  function  Search(){
    console.log('Se hizo click en este boton')
  }
  </script>
  
  
  <style >
  
  
  </style>