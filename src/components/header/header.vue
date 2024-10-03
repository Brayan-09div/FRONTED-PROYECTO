<template>
  <div id="en">
    <button id="atras" @click="Salir()">
      <span class="material-symbols-outlined"><q-icon name="arrow_back"></q-icon></span>
    </button>
    <h1 id="programas">{{title}}</h1>
  </div>
  <hr>
</template>

<script setup>

const props = defineProps({
  title:{
    type:String,
    Required:true,
    default:'Title'
  }
})

</script>

<style>
#en {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  padding-top: 0px;
}

#programas {
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  padding-top: 20px;
  margin-bottom: 0px;
}

#atras {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: rgb(8, 73, 55);
  color: white;
  margin-left: 3%;
  margin-top: 2%;
  cursor: pointer;
  position: absolute;
}

#atras:focus {
  outline: none;
}

hr {
  width: 95%;
  border: 2px solid #2F7D32;
  margin: 0 auto;
  margin-top: -20px;
  margin-bottom: 0px;
}
</style>