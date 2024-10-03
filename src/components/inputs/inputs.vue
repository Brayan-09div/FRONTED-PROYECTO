<template>
  <!-- <label :label="label"></label> -->
    <input  :placeholder="placeholder" type="text" name="" id="">
    <!-- <q-input :v-model="vmodel" :placeholder="placeholder" :dense="dense" /> -->
</template>

<script setup>
const props = defineProps({
    placeholder:{
        type:String,
        require:true,
        default:"No hay ningun titulo"
    },
  vmodel: {
    type: String,
    require: true
  }
})
</script>