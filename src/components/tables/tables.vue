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

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <p style="color: green;" v-if="props.row.status === 1">Activo</p>
          <p style="color: red;" v-else>Inactivo</p>
        </q-td>
      </template>

      <template v-slot:body-cell-editar="props">
        <q-td :props="props" class="q-pa-xs text-center">
          <q-btn
            class="edit-btn"
            @click="onClickEdit(props.row)"
            color="primary"
            icon="edit"
            round
            size="md"
            aria-label="Edit"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-activar="props">
        <q-td :props="props" class="q-pa-xs text-center">
          <q-btn
            class="toggle-btn"
            @click="toggleActivate(props.row)"
            :icon="props.row.status == 1 ? 'check' : 'close'"
            round
            size="md"
            aria-label="Toggle Activation"
            :color="props.row.status == 1 ? 'positive' : 'negative'"
          />
        </q-td>
      </template>


    </q-table>
  </div>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  onClickEdit: {
    type: Function,
    required: true
  },
  toggleActivate: {
    type: Function,
    required: true
  },
});
</script>

<style scoped>
.q-table-custom {
  border: 1px solid #000000; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  /* background-color: green; */
}



.custom-header-row {
  background-color: #4CAF50; /* Verde para el encabezado */
}

.custom-header-cell {
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 12px;
  font-size: 16px; 
  font-weight: 700; 
}


.custom-footer-row {
  background-color: #4CAF50; /* Verde para el pie de página */
}

.custom-footer-cell {
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 12px;
}

</style>
