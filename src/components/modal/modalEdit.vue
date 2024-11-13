<template>
    <div>
      <!-- Botón de Editar -->
      <q-btn
        class="edit-btn"
        @click="openModal"
        color="primary"
        icon="edit"
        round
        size="md"
        aria-label="Edit"
      />
  
      <!-- Modal Componetizado -->
      <q-dialog v-model="isModalOpen">
        <q-card>
          <q-card-section class="title">
            <div class="text-h6 text-center">Editar Información</div>
          </q-card-section>
  
          <q-separator />
  
          <q-card-section>
            <!-- Contenido dinámico del modal -->
            <p>Información de la fila: {{ rowData.name }}</p>
          </q-card-section>
  
          <q-separator />
  
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cerrar"
              @click="closeModal"
              color="red-8"
              style="font-weight: bold;"
            />
            <q-btn
              flat
              label="Guardar"
              @click="saveData"
              color="white"
              style="background-color: #2f7d32; font-weight: bold;"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Props que recibe el componente
  const props = defineProps({
    row: {
      type: Object,
      required: true,
    }
  });
  
  // Estado para controlar la apertura/cierre del modal
  const isModalOpen = ref(false);
  const rowData = ref({});
  
  // Método para abrir el modal y asignar la fila seleccionada
  const openModal = () => {
    rowData.value = props.row; // Se pasa la información de la fila
    isModalOpen.value = true;  // Abre el modal
  };
  
  // Método para cerrar el modal
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // Método de ejemplo para guardar los cambios (puedes personalizarlo)
  const saveData = () => {
    console.log("Datos guardados:", rowData.value);
    closeModal(); // Cierra el modal después de guardar
  };
  </script>
  
  <style scoped>
  .edit-btn {
    background-color: #1c4b33 !important;
  }
  </style>
  