
<template>
    <q-drawer
        :v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="400"
      >
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable to="/home" v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <q-item active clickable to="/apprentices" v-ripple>
              <q-item-section avatar>
                <q-icon name="groups" />
              </q-item-section>

              <q-item-section>
                Aprendices
              </q-item-section>
            </q-item>

            <q-item clickable to="/fiche" v-ripple>
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>

              <q-item-section>
                Fichas
              </q-item-section>
            </q-item>

            <q-item clickable to="/register"  v-ripple>
              <q-item-section avatar>
                <q-icon name="book" />
              </q-item-section>

              <q-item-section>
                Registros
              </q-item-section>
            </q-item>

            <q-item clickable to="/myAssignament" v-ripple>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>
                Mis Asignaciones
              </q-item-section>
            </q-item>

            <q-item clickable to="/assignament" v-ripple>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>

              <q-item-section>
                Asignaciones
              </q-item-section>
            </q-item>
            
            <q-item clickable to="/binnacles" v-ripple>
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>

              <q-item-section>
                Bitacoras
              </q-item-section>
            </q-item>

            <q-item clickable to="/followup" v-ripple>
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>

              <q-item-section>
                Seguimientos
              </q-item-section>
            </q-item>

            <q-item clickable to="/information" v-ripple>
              <q-item-section avatar>
                <q-icon name="file_copy" />
              </q-item-section>

              <q-item-section>
                Informes
              </q-item-section>
            </q-item>



          </q-list>
        </q-scroll-area>
      </q-drawer>
</template>
<script setup>

import { ref, watch, defineEmits } from "vue";

const props = defineProps({
  drawer:{
    type:Boolean,
    required:true
  }
}
);

const emit = defineEmits(['update:drawer']);

const drawer = ref(props.drawer);

watch(() => props.drawer, (newVal) => {
  drawer.value = newVal;
});

watch(drawer, (newVal) => {
  emit('update:drawer', newVal);
});
</script>
