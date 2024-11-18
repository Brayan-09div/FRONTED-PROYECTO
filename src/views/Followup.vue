<template>
  <Header title="Seguimiento"></Header>
  <div id="container-search">
    <q-select v-model="apprentice" :options="filterOptionsApprentice" label="Buscar Aprendiz" emit-value map-options
      option-label="label" option-value="_id" :use-input="!followup" @filter="filterFunctionsApprentice" use-chips
      :rules="[(val) => !!val || 'El Modalidad Etapa Productiva es obligatorio']" filled
      @update:model-value="searchApprentice"/>

  </div>




  <tableSelect :props="props" :rows="rows" :columns="columns" :onClickSeeObservation="openClickSeeObservation"
    :onClickCreateObservation="openClickCreateObservation" />

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
import { ref } from 'vue';
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tableSelect.vue';
import ModalDialog from '../components/modal/dialogClose.vue';
import { getData } from '../services/ApiClient';
import dialogSeeObservation from '../components/modal/dialogClose.vue'
import dialogCreateObservation from '../components/modal/dialogSaveClose.vue';
import { formatDate } from '../utils/changeDateFormat';

let isDialogVisibleCreateObservation = ref(false)
let isDialogVisibleObservation = ref(false)

// filtro
let filterOptionsApprentice = ref([]);
let optionsApprentice = ref([]);
let followup = ref(false);

let isModalDialogVisibleDetail = ref(false)
let isModalDialogVisibleObservation = ref(false)

const rows = ref([
  {
    name: "John Doe",
    number: "12345",
    status: "1",
    observationDate: "2022-02-02"
  }, {
    name: "John Doe",
    number: "12345",
    status: "1",

    observationDate: "2022-02-02"
  },
  {
    name: "John Doe",
    number: "12345",
    status: "3",
    observationDate: "2022-02-02"
  }
])



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
    field: "name",
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
    field: row => formatDate(row.observationDate),
    sortable: true,
  }
])

async function loadDataFollowup() {
  const response = await getData('/followup/listallfollowup');
  rows.value = response
}


async function openClickObservation() {
  isModalDialogVisibleObservation.value = true
}

async function openClickDetail() {
  isModalDialogVisibleDetail.value = true
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



async function fetchDataApprentice() {
  const response = await getData('/apprendice/listallapprentice');
  optionsApprentice.value = response.map(option => ({
    _id: option._id,
    label: `${option.firstName} ${option.lastName} - ${option.numDocument}`,
    document: option.numDocument,
    name: `${option.firstName} ${option.lastName}`

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


async function searchApprentice(apprenticeId) {
  if (!apprenticeId) return;
  try {
    const response = await getData(`/apprendice/${apprenticeId}`);
    // Actualiza los datos en la tabla con la información del aprendiz seleccionado
    rows.value = [response];
  } catch (error) {
    console.error("Error al buscar el aprendiz:", error);
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
</style>