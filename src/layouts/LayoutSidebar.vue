<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="300"
    :breakpoint="400"
  >
    <q-img
      class="absolute-top"
      src=""
      style="height: 150px; background-color: #ddd;"
    >
      <div class="absolute-bottom bg-transparent user-info">
        <q-avatar size="65px" class="q-mb-sm">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoms2HEy0ELPrZGRr001PN2sh5sq9dU_BWQ&s">
        </q-avatar>
        <div class="text-weight-bold text-center" style="text-transform: uppercase; color: black; font-weight: 900; font-size: 15px;">Razvan Stoenescu</div>
        <div class="text-center" style="color: black;">@rstoenescu</div>
      </div>
    </q-img>

    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item 
          clickable 
          to="/layouts/home" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveHome }" 
          @click="setActive('home')"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/apprentices" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveApprentices }" 
          @click="setActive('apprentices')"
        >
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>Aprendices</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/fiche" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveFiche }" 
          @click="setActive('fiche')"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>Fichas</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/register" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveRegister }" 
          @click="setActive('register')"
        >
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>Registros</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/assignament" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveAssignment }" 
          @click="setActive('assignment')"
        >
          <q-item-section avatar>
            <q-icon name="how_to_reg" />
          </q-item-section>
          <q-item-section>Asignaciones</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/myAssignament" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveMyAssignment }" 
          @click="setActive('myAssignment')"
        >
          <q-item-section avatar>
            <q-icon name="how_to_reg" />
          </q-item-section>
          <q-item-section>Mis Asignaciones</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/binnacles" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveBinnacles }" 
          @click="setActive('binnacles')"
        >
          <q-item-section avatar>
            <q-icon name="fact_check" />
          </q-item-section>
          <q-item-section>Bitacoras</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/followup" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveFollowup }" 
          @click="setActive('followup')"
        >
          <q-item-section avatar>
            <q-icon name="contact_page" />
          </q-item-section>
          <q-item-section>Seguimientos</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/modality" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveModality }" 
          @click="setActive('modality')"
        >
        <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Modalidad EP</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/information" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveInformation }" 
          @click="setActive('information')"
        >
          <q-item-section avatar>
            <q-icon name="file_copy" />
          </q-item-section>
          <q-item-section>Informes</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/certificaciones" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveCertificaciones }" 
          @click="setActive('certificaciones')"
        >
        <q-item-section avatar>
            <q-icon name="done_all" />
          </q-item-section>
          <q-item-section>Certificaciones</q-item-section>
        </q-item>

        <q-item 
          clickable 
          to="/layouts/horas" 
          class="menu-item" 
          v-ripple 
          :class="{ 'active': isActiveHoras }" 
          @click="setActive('horas')"
        >
        <q-item-section avatar>
            <q-icon name="more_time" />
          </q-item-section>
          <q-item-section>Informe Horas</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);
const isActiveHome = ref(true); // Establecer el primer botón como activo por defecto
const isActiveApprentices = ref(false);
const isActiveFiche = ref(false);
const isActiveModality = ref(false);
const isActiveRegister = ref(false);
const isActiveHoras = ref(false);
const isActiveCertificaciones = ref(false);
const isActiveMyAssignment = ref(false);
const isActiveAssignment = ref(false);
const isActiveBinnacles = ref(false);
const isActiveFollowup = ref(false);
const isActiveInformation = ref(false);

function setActive(menu) {
  isActiveHome.value = menu === 'home';
  isActiveApprentices.value = menu === 'apprentices';
  isActiveFiche.value = menu === 'fiche';
  isActiveModality.value = menu === 'modality';
  isActiveRegister.value = menu === 'register';
  isActiveHoras.value = menu === 'horas';
  isActiveCertificaciones.value = menu === 'certificaciones';
  isActiveMyAssignment.value = menu === 'myAssignment';
  isActiveAssignment.value = menu === 'assignment';
  isActiveBinnacles.value = menu === 'binnacles';
  isActiveFollowup.value = menu === 'followup';
  isActiveInformation.value = menu === 'information';
}
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.menu-item {
  background-color: #2F7D32;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 8px;
  padding: 10px;
  font-weight: bold;
}

.menu-item .q-item-section {
  color: white;
}

.menu-item.active {
  color: #99e785;
}
</style>
