<template>
    <!-- <div class="q-pa-md"> -->
    <q-layout view="hHh Lpr lff" >
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-green-8'">
        <q-toolbar>
          <q-btn flat @click=" drawer= !drawer" round dense icon="menu" />
          <q-toolbar-title >REPFORA</q-toolbar-title>
       <q-icon name="logout"  style="font-size: 25px;"></q-icon>
        </q-toolbar>
        <div> </div>
      </q-header>
  
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseenter="miniState = false"
        @mouseleave="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 1 }">
          <q-list padding>
            <q-item clickable to="/home" v-ripple class="menu-button custom-menu-item">
             
                <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
  
              <q-item-section> Inicio </q-item-section>
            </q-item>
  
            <q-separator />
            
            <q-item clickable to="/instructor" v-ripple class="menu-button custom-menu-item">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
  
              <q-item-section> Instructor </q-item-section>
            </q-item>

            <q-separator />
  
            <q-item clickable to="/apprentice" v-ripple class="menu-button custom-menu-item">
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
  
              <q-item-section> Aprendices </q-item-section>
            </q-item>
            
            <q-separator />

            <q-item clickable to="/assignment" v-ripple class="menu-button custom-menu-item">
              <q-item-section avatar>
                <q-icon name="book" />
              </q-item-section>
  
              <q-item-section> Asignaciones </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable to="/followup" v-ripple class="menu-button custom-menu-item">
              <q-item-section avatar>
                <q-icon name="assignment_ind" />
              </q-item-section>
  
              <q-item-section> Seguimientos</q-item-section>
            </q-item>
  
            <q-separator />

            <q-item clickable to="/binnacles" v-ripple class="menu-button custom-menu-item">
              <q-item-section avatar>
                <q-icon name="note" />
              </q-item-section>
  
              <q-item-section> Bitacoras </q-item-section>
            </q-item>
  
            <q-separator />
            
          </q-list>
        </q-scroll-area>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer elevated class="bg-green-8 text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          <div>Soporte - 2024</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    </q-layout>

    <!-- </div> -->
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();
  
  let drawer = ref(false);
  let miniState = ref(true);
  </script>


<style>

.menu-button{
    color: black;
    font-weight: bold;
    font-size: 15px;
}


.menu-button.custom-menu-item {
  color: #000000 !important; /* Cambia el color del texto a verde */
}

.menu-button.custom-menu-item:hover {
  background-color: rgba(76, 175, 80, 0.1); /* Cambia el color de fondo al pasar el mouse */
}

.menu-button.custom-menu-item.q-item--active {
  color: #388E3C !important; /* Cambia el color del texto cuando está activo */
}

</style>