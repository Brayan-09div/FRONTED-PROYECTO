<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      flat
      bordered
      class="q-table-custom"
    >
      <template v-slot:header="props">
        <q-tr :props="props" class="custom-header-row">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="custom-header-cell"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <!-- Columna de estado con botón de activación/desactivación -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props" class="q-pa-xs text-center">
          <q-btn
            @click="toggleActivate(props.row)"
            :color="props.row.status === 1 ? 'green' : 'red'"
            :loading="loadingStates[props.row._id]"
          >
            <q-spinner
              v-if="loadingStates[props.row._id]"
              color="white"
              size="20px"
            />
            {{ props.row.status === 1 ? "Activo" : "Inactivo" }}
          </q-btn>
        </q-td>
      </template>

      <!-- Columna de select -->
      <template v-slot:body-cell-select="props">
        <q-td :props="props" class="q-pa-xs text-center">
          <q-select
            v-model="props.row.select"
            :options="estadoOptions"
            :class="{
              'estado-Programado': props.row.Estado === 'Programado',
              'estado-Ejecutado': props.row.Estado === 'Ejecutado',
              'estado-Pendiente': props.row.Estado === 'Pendiente',
              'estado-Verificado': props.row.Estado === 'Verificado',
            }"
            label="Seleccione Estado"
            dense
            outlined
            @update:model-value="() => actualizarEstado(props.row)"
            emit-value
            map-options
          ></q-select>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
let loading = ref(false);
let loadingStates = ref({});

const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  onClickEdit: {
    type: Function,
    required: true,
  },
  toggleActivate: {
    type: Function,
    required: true,
  },
});

const toggleActivate = async (row) => {
  loadingStates.value[row._id] = true;
  try {
    await props.toggleActivate(row);
  } finally {
    loadingStates.value[row._id] = false;
  }
};
const estadoOptions = [
  { label: "Programado", value: "1" },
  { label: "Ejecutado", value: "2" },
  { label: "Pendiente", value: "3" },
  { label: "Verificado", value: "4" },
];
</script>

<style scoped>
.q-table-custom {
  border: 1px solid #000000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-header-row {
  background-color: #4caf50; /* Verde para el encabezado */
}

.custom-header-cell {
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
}

.edit-btn {
  background-color: #1c4b33 !important;
}
</style>