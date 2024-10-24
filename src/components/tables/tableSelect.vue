<template>
    <div class="q-pa-md">
        <q-table :rows="rows" :columns="columns" flat bordered class="q-table-custom">
            <template v-slot:header="props">
                <q-tr :props="props" class="custom-header-row">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="custom-header-cell">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <!-- Columna de Estado -->
            <template v-slot:body-cell-status="props">
                <q-td 
                :props="props" 
                class="q-pa-xs text-center">
                    <q-select :v-model="props.row.status" 
                    :options="OptionsStatus" 
                    :class="{
                        'select-Programado': props.row.status === '1',
                        'select-Ejecutado': props.row.status === '2',
                        'select-Pendiente': props.row.status === '3',
                        'select-Verificado': props.row.status === '4'
                    }" 
                      label="Seleccione Estado" 
            dense 
            outlined 
            emit-value 
            map-options

            >
                    </q-select>
                </q-td>
            </template>

            
      <!-- Columna de editar -->
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
        </q-table>
    </div>
</template>

<script setup>
import { ref } from "vue";
let loading = ref(false);
let loadingStates = ref({});

const OptionsStatus = [
    { label: 'Programado', value: '1' },
    { label: 'Ejecutado', value: '2' },
    { label: 'Pendiente', value: '3' },
    { label: 'Verificado', value: '4' }
];
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
</script>

<style scoped>
.q-table-custom {
    border: 1px solid #000000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-header-row {
    background-color: #4caf50;
    /* Verde para el encabezado */
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