<template>
  <Header title="Bitacoras"></Header>
  <div id="container-buttons">
    <div class="searchButtons">
      <div>
        <radioButtonInstructor v-model="radioButtonList" label="Instructor" val="instructor"
          @update:model-value="handleRadioChange" />
        <radioButtonApprentice v-model="radioButtonList" label="Aprendiz" val="apprentice"
          @update:model-value="handleRadioChange" />
      </div>
      <inputSearch class="searchInput" v-model="searchValue" label="Ingrede el nombre o el numero de documento"
        @input="searchBinnacles" />
    </div>
  </div>

  <tableSelect :props="props" :rows="rows" :columns="columns" :title="title" :options="OptionsStatus"
    :onClickSeeObservation="openClickSeeObservation" :onClickCreateObservation="openClickCreateObservation"
    :onclickSelectOptions="onclickSelectOptions" :loading="loading" />

  <dialogSeeObservation v-model="isDialogVisibleObservation" title="OBSERVACIONES" labelClose="Cerrar"
    labelSend="Guardad" :onclickClose="closeDialog" :onclickSend="saveChanges"
    :informationBinnacles="observationBinnacles">

  </dialogSeeObservation>

  <dialogCreateObservation v-model="isDialogVisibleCreateObservation" title="AÑADIR ODSERVACIONES" labelClose="close"
    labelSend="handleSend" :onclickClose="closeDialog" :onclickSend="handleSend"
    labelTextArea="Escriba esta odservación para esta Bitácora">
  </dialogCreateObservation>

</template>

<script setup>
import { ref, onBeforeMount, handleError } from 'vue';
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tableSelect.vue'
import dialogSeeObservation from '../components/modal/dialogClose.vue'
import dialogCreateObservation from '../components/modal/dialogSaveClose.vue';
import inputSearch from '../components/input/inputSearch.vue';
import radioButtonInstructor from '../components/radioButtons/radioButton.vue';
import radioButtonApprentice from '../components/radioButtons/radioButton.vue';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';
import { getData, postData, putData } from '../services/ApiClient';
import { Loading } from 'quasar';

let searchValue = ref('');
let radioButtonList = ref('');

const title = ref("Lista de Bitacoras");
let observationBinnacles = ref('');
const isDialogVisibleObservation = ref(false);
const isDialogVisibleCreateObservation = ref(false);

onBeforeMount(async () => {
  await loadDataBinnacles();
})

// spiner
let loading = ref(false);

const rows = ref([]);
const columns = ref([
  {
    name: "Num",
    label: "N°",
    align: "center",
    field: "Num",
    sortable: true,
  },
  {
    name: "name",
    label: "ETAPA PRODUCTIVA ASIGNADA",
    align: "center",
    field: row => row.observation.user,
    sortable: true,
  },
  {
    name: "number",
    label: "N° BITACORA",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "user",
    label: "NOMBRE INSTRUCTOR",
    align: "center",
    field: row => row.instructor.name,
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  }, {
    name: "observation",
    label: "OBSERVACIONES",
    align: "center",
    field: "observation",
    sortable: true,
  }
])
async function loadDataBinnacles() {
  loading.value = true;
  try {
    const response = await getData('/binnacles/listallbinnacles');
    rows.value = response
  } catch (error) {
    notifyErrorRequest('Error al cargar las bitacoras')
  }finally{
    loading.value = false
  }

}

async function openClickSeeObservation(row) {
  isDialogVisibleObservation.value = true;
  if (!row.observation.observation) {
    observationBinnacles.value = 'No hay observaciones para esta bitacora';
  } else {
    observationBinnacles.value = row.observation.observation;
  }
}
async function openClickCreateObservation() {
  isDialogVisibleCreateObservation.value = true;
}

async function handleSend() {
  const response = await postData('')
}

const OptionsStatus = [
  { label: 'Programado', value: '1' },
  { label: 'Ejecutado', value: '2' },
  { label: 'Pendiente', value: '3' },
  { label: 'Verificado', value: '4' }
];

async function onclickSelectOptions(row, value) {
  try {
    const response = await putData(`/binnacles/updatestatus/${row._id}/${OptionsStatus.value}`, {
      status: row.value

    });
    const index = rows.value.findIndex(r => r._id === row._id);
    if (index !== -1) {
      rows.value[index].status = value; // Actualiza solo el estado de la fila modificada
    }
    console.log("Estado actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
  }
}


async function searchInstructor() {
  try {
    const response = await getData(`/binnacles/listbinnaclesbyinstructor/${searchValue.value}`)
    console.log(response);
    rows.value = response
  } catch (error) {
    const messageError = error.response.data.error || 'Error al buscar ficha'
    notifyErrorRequest(messageError)
  }
}

async function searchApprentice() {
  try {
    const response = await getData(`/binnacles/listbinnaclesbyinstructor/${searchValue.value}`)
    console.log(response);
    rows.value = response
  } catch (error) {
    const messageError = error.response.data.errors[0].msg || 'Error al buscar aprendiz'
    console.log(messageError);
    notifyErrorRequest(messageError)
  }
}


function handleRadioChange() {
  validationSearch()
  if (radioButtonList.value === 'instructor') {
    searchInstructor()
  } else if (radioButtonList.value === 'apprentice') {
    searchApprentice()
  }
  clearSearch()
  clearRadioButtons()
}

function searchBinnacles() {
  if (radioButtonList.value === 'instructor') {
    searchInstructor()
  } else if (radioButtonList.value === 'apprentice') {
    searchApprentice()
  }
}

// limpiar campos de busqueda
function clearSearch() {
  searchValue.value = '';
}

// limpiar radio buttons
function clearRadioButtons() {
  radioButtonList.value = '';
}

// validaciones de campo de busqueda
function validationSearch() {
  if (searchValue.value === '') {
    notifyWarningRequest('El campo de busqueda no puede estar vacio');
    clearRadioButtons()
    return;
  }
}

</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.Observations,
.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  text-align: center;
  background-color: #f0f0f0;
}

.Observations,
.detail p {
  font-size: 18px;
  color: #989595;
  margin: 0px;
}

#container-buttons {
  display: flex;
  justify-content: flex-end;
  margin: 20px;

}

.searchButtons {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}
</style>
