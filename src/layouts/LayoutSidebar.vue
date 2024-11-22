<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="300"
    :breakpoint="400"
  >
    <!-- Información del usuario -->
    <q-img
      class="absolute-top"
      src=""
      style="height: 150px; background-color: #ddd;"
    >
      <div class="absolute-bottom bg-transparent user-info">
        <q-avatar size="65px" class="q-mb-sm">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoms2HEy0ELPrZGRr001PN2sh5sq9dU_BWQ&s" />
        </q-avatar>
        <div class="text-weight-bold text-center" style="text-transform: uppercase; color: black; font-weight: 900; font-size: 15px;">ADMINISTRADOR</div>
        <div class="text-center" style="color: black;">etapaspruebas@gmail.com</div>
      </div>
    </q-img>

    <!-- Lista de navegación -->
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <template v-for="(menuItem, index) in menuItems" :key="index">
          <q-item
            clickable
            :to="menuItem.route"
            class="menu-item"
            v-ripple
            :class="{ 'active': activeRoute === menuItem.key }"
            @click="setActive(menuItem.key)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

// Estado del drawer
const drawer = ref(false);

// Rutas activas y lista de navegación
const activeRoute = ref("home");

const menuItems = [
  { key: "home", label: "Inicio", route: "/layouts/home", icon: "home" },
  { key: "apprentices", label: "Aprendices", route: "/layouts/apprentices", icon: "groups" },
  { key: "fiche", label: "Fichas", route: "/layouts/fiche", icon: "school" },
  { key: "register", label: "Registros", route: "/layouts/register", icon: "book" },
  { key: "assignment", label: "Asignaciones", route: "/layouts/assignament", icon: "how_to_reg" },
  { key: "myAssignment", label: "Mis Asignaciones", route: "/layouts/myAssignament", icon: "how_to_reg" },
  { key: "binnacles", label: "Bitacoras", route: "/layouts/binnacles", icon: "fact_check" },
  { key: "followup", label: "Seguimientos", route: "/layouts/followup", icon: "contact_page" },
  { key: "modality", label: "Modalidad EP", route: "/layouts/modality", icon: "settings" },
  { key: "information", label: "Informes", route: "/layouts/information", icon: "file_copy" },
  { key: "certificaciones", label: "Certificaciones", route: "/layouts/certificaciones", icon: "done_all" },
  { key: "horas", label: "Informe Horas", route: "/layouts/horas", icon: "more_time" },
];

// Método para activar el menú correspondiente
function setActive(menuKey) {
  activeRoute.value = menuKey;
}
</script>

<style scoped>
/* Estilo del usuario */
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Estilo del menú */
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
  transition: all 0.3s ease;
}

.menu-item .q-item-section {
  color: white;
}

.menu-item.active {
  background-color: #2F7D32;
  color: #8ef191;
}
</style>

