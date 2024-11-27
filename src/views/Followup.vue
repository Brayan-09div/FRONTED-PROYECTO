<template>
  <Header title="Seguimiento"></Header>
  <div id="container-search">
    <div class="InputButtonsSearch">
      <inputSelect v-model="searchValue" :options="filterOptionsApprentice" label="Buscar Aprendiz" optionLabel="label"
        optionValue="_id" :useInput="!followup" :filter="filterFunctionsApprentice" class="custom-select" />
      <buttonSearch :onclickButton="searchApprentice" />
    </div>
  </div>

  <tableSelect :rows="rows" :columns="columns" :onClickSeeObservation="openClickSeeObservation"
    :onClickCreateObservation="openClickCreateObservation" :loading="loading" />

  <dialogSeeObservation v-model="isDialogVisibleObservation" title="OBSERVACIONES" labelClose="Cerrar"
    labelSend="Guardad" :onclickClose="closeDialog" :onclickSend="saveChanges"
    :informationBinnacles="observationFollowup">

  </dialogSeeObservation>

  <dialogCreateObservation v-model="isDialogVisibleCreateObservation" title="AÑADIR ODSERVACIONES" labelClose="close"
    labelSend="guardar" :onclickClose="closeDialog" :onclickSend="handleSend"
    labelTextArea="Escriba esta odservación para este Seguimiento" v-model:textValue="newObservation">
  </dialogCreateObservation>

</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tableSelect.vue';
import { getData, putData } from '../services/ApiClient';
import dialogSeeObservation from '../components/modal/dialogClose.vue'
import dialogCreateObservation from '../components/modal/dialogSaveClose.vue';
import { formatDate } from '../utils/changeDateFormat';
import inputSelect from '../components/input/inputSelect.vue';
import buttonSearch from '../components/buttons/buttonSearch.vue';
import { Loading } from 'quasar';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify';
import { useRoute } from 'vue-router';

let isDialogVisibleCreateObservation = ref(false)
let isDialogVisibleObservation = ref(false)

// filtro
let filterOptionsApprentice = ref([]);
let optionsApprentice = ref([]);
let followup = ref(false);
let searchValue = ref('');

// spiner
let loading = ref(false);

// observación
let observationFollowup = ref('');
let newObservation = ref('')

let route = useRoute();
onBeforeMount(() => {
  loadDataFollowup();
});
const rows = ref([])

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
    label: "ETAPA PRODUCTIVA SEGUIMIENTO",
    align: "center",
    field: row => row.register.idApprentice[0].firstName + ' ' + row.register.idApprentice[0].lastName,
    sortable: true,
  },
  {
    name: "number",
    label: "N° SEGUIMIENTO",
    align: "center",
    field: "number",
    sortable: true,
  }, {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "observation",
    label: "OBSERVACINES",
    align: "center",
    field: "observation",
    sortable: true,
  },
  {
    name: "observationDate",
    label: "Fecha",
    align: "center",
    field: row => formatDate(row.createdAt),
    sortable: true,
  }
])

async function loadDataFollowup() {
  loading.value = true;
  const idInstructor = route.query.id
  console.log('idInstructor:', idInstructor);
  try {
    if (idInstructor) {
      const response = await getData(`/followup/listfollowupbyinstructor/${idInstructor}`);
      console.log(response);
      rows.value = response
    } else {
      const response = await getData('/followup/listallfollowup');
      console.log(response)
      rows.value = response
    }
  } catch (error) {
    const message = error.response.data.errors[0].msg || error.response.data.message || 'Error al cargar los seguimientos';
    notifyErrorRequest(message)
  } finally {
    loading.value = false;
  }

}


async function openClickSeeObservation(row) {
  isDialogVisibleObservation.value = true;
  if (!row.observation.observation) {
    observationFollowup.value = 'No hay observaciones para esta bitacora';
  } else {
    observationFollowup.value = row.observation.map(obs => obs.observation);
  }
}
async function openClickCreateObservation() {
  isDialogVisibleCreateObservation.value = true;
}
async function handleSend() {
  try {
    const response = await putData(`/followup/${id.value}`, { observation: newObservation.value });
    notifySuccessRequest('Observación guardada correctamente');
    await loadDataFollowup();
  } catch (error) {
    if (newObservation.value === '') {
      validarHandleSend();
    } else {
      const message = error.response.data.errors[0].msg || error.response.data.message || 'Error al guardar La obsevación';
      notifyErrorRequest(message);
    }

  }
}

function validarHandleSend() {
  if (newObservation.value === '') {
    notifyWarningRequest('El campo de observación no puede estar vacio');

  }
}


async function fetchDataApprentice() {
  const response = await getData('/followup//listallfollowup');
  optionsApprentice.value = response.map(option => ({
    _id: option._id,
    label: `${option.register.idApprentice[0].firstName} ${option.register.idApprentice[0].lastName} - ${option.register.idApprentice[0].numDocument}`,
  }));
  filterOptionsApprentice.value = optionsApprentice.value;

}
fetchDataApprentice();

async function filterFunctionsApprentice(val, update) {
  if (val === " ") {
    update(() => {
      filterOptionsApprentice.value = filterOptionsApprentice.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptionsApprentice.value = optionsApprentice.value.filter((option) =>
      option.label.toLowerCase().includes(needle) ||
      option.numDocument.toLowerCase().includes(needle)
    );
  });
}


async function searchApprentice() {
  try {
    const response = await getData(`/followup/listfollowupbyid/${searchValue.value}`);
    console.log(response);
    rows.value = [response];
  } catch (error) {
    if (searchValue.value === '') {
      validarHandleSend()
    } else {
      const message = error.response.data.errors[0].msg || error.response.data.message || 'Error al buscar aprendiz';
      notifyErrorRequest(message);
    }
    await loadDataFollowup()
  }
}


</script>


<style scoped>
#container-search {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
  margin-bottom: auto;
}

.custom-select {
  width: 400px;
  /* Ajusta el tamaño del select */
}

.InputButtonsSearch {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>