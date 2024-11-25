<template>
  <Header title="Asignaciones"></Header>

  <div id="buttons-container">
    <div class="buttons">
      <ButtonAgregate class="formAssignament " v-model="isDialogVisibleModalAssignament" nameButton="Crear"
        :title="labelTitle" :openModalButton="onclickButtonCreate" :onclickSend="handleSendCreate"
        :onclickClose="handleCole" :labelSend="Guardar" :labelClose="cerrar">

        <div class="formAssinament">

          <q-input v-model="firstName" label="Nombre Aprendiz" v-show="apprenticeName"
            :rules="[(val) => !!val || 'Este campo Nombres Aprendiz es obligatorio']" filled>
            <template v-slot:prepend>
              <q-icon name="abc" />
            </template>
          </q-input>

          <q-input v-model="idinstructorFollow" label="Intructor de Seguimiento"
            :rules="[(val) => !!val || 'Este campo  Instructor de Seguimiento es obligatorio']" filled>
            <template v-slot:prepend>
              <q-icon name="abc" />
            </template>
          </q-input>

          <q-input v-model="idinstructortechnical" label="Intructor de Técnico"
            :rules="[(val) => !!val || 'Este campo Instructoe Técnico es obligatorio']" filled>
            <template v-slot:prepend>
              <q-icon name="abc" />
            </template>
          </q-input>


          <q-input v-model="idinstructorproject" label="Instructor de Proyecto"
            :rules="[(val) => !!val || 'Este campo Instructor de Proyecto es obligatorio']" filled>
            <template v-slot:prepend>
              <q-icon name="abc" />
            </template>
          </q-input>
        </div>
      </ButtonAgregate>
    </div>

    <div class="AllButtonsSearch">
      <div class="filterButtons">
        <p>Seleccione una opción:</p>
        <radioButtonApprentice v-model="radioButtonList" label="Aprendiz" val="apprentice"
          @update:model-value="handleRadioChange" />
        <radioButtonInsFollow v-model="radioButtonList" label="Inst. Seguimiento" val="instFollowup"
          @update:model-value="handleRadioChange" />
        <radioButtonInstTechnical v-model="radioButtonList" label="Inst. Tecnico" val="instTechnical"
          @update:model-value="handleRadioChange" />
        <radioButtonInstProject v-model="radioButtonList" label="Inst. Proyecto" val="instProject"
          @update:model-value="handleRadioChange" />

      </div>

      <div class="InputButtonsSearch">
        <inputSelect v-model="searchValue" label="Buscar" :options="filterOptionsSearch" optionLabel="label"
          optionValue="_id" :useInput="!Search" :filter="filterFunctionSearch" class="custom-select" />
        <buttonSearch :onclickButton="searchDate" />
      </div>

    </div>
  </div>
  <TableOptions :rows="rows" :columns="columns" :title="title" :toggleActivate="changestatus"
    :onClickEdit="onclickButtonEdit" :onClickAdd="onclickButtonAdd" :loading="loading">
  </TableOptions>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Header from '../components/header/Header.vue';
import ButtonAgregate from '../components/modal/modal.vue';
import TableOptions from "../components/tables/tableStatusSearchCreateAdd.vue";
import radioButtonApprentice from "../components/radioButtons/radioButton.vue";
import radioButtonInsFollow from "../components/radioButtons/radioButton.vue";
import radioButtonInstTechnical from "../components/radioButtons/radioButton.vue";
import radioButtonInstProject from "../components/radioButtons/radioButton.vue";
import inputSelect from "../components/input/inputSelect.vue";
import buttonSearch from "../components/buttons/buttonSearch.vue";
import { getData, putData, postData } from "../services/ApiClient.js";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';

onBeforeMount(async () => {
  await loadDataAssignament();
})

//  formulario
let firstName = ref('');
let idinstructorFollow = ref('');
let idinstructortechnical = ref('');
let idinstructorproject = ref('')

// radio buttons
let searchValue = ref('');
let radioButtonList = ref('');
let optionSearch = ref([]);
let filterOptionsSearch = ref([]);

// modals
let isDialogVisibleModalAssignament = ref(false);
let apprenticeName = ref(false)
let labelTitle = ref('');

// spiner
let loading = ref(false);

const rows = ref([]);
const columns = ref([
  {
    name: "Num",
    label: "N°",
    field: "numero",
    align: "center",
  },
  {
    name: "register",
    label: "NOMBRE APRENDIZ",
    field: row => row.idApprentice[0] && row.idApprentice.length > 0 ? row.idApprentice[0].firstName + " " +
      row.idApprentice[0].lastName : 'No asignado',
    align: "resgister",
  },
  {
    name: "numApprentice",
    label: "N° APREDIZ",
    field: row => row.idApprentice ? row.idApprentice.length : 0,
    align: "center",

  },
  {
    name: "program",
    required: true,
    label: "PROGRAMA",
    align: "center",
    field: row => row.idApprentice && row.idApprentice.length > 0 && row.idApprentice[0].fiche ?
      row.idApprentice[0].fiche.name : 'No asignado',
    sortable: true,
  },
  {
    name: "modality",
    align: "center",
    label: "MODALIDAD",
    field: row => row.idModality ? row.idModality.name : 'Modalidad no Asignada',
    sortable: true,
  },
  {
    name: "projectInstructor",
    label: "INS. SEGUIMIENTO",
    align: "center",
    field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].followUpInstructor ?
      row.assignment[0].followUpInstructor[0].name : 'No asignado',
    sortable: true,
  },
  {
    name: "instTechnical",
    label: "INS. TECNICO",
    field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].technicalInstructor ?
      row.assignment[0].technicalInstructor[0].name : 'No asignado',
  }, {
    name: "instProject",
    label: "INS. PROYECTO",
    align: "center",
    field: row => row.assignment && row.assignment.length > 0 && row.assignment[0].projectInstructor ?
      row.assignment[0].projectInstructor[0].name : 'No asignado',
    sortable: true,
  }, {
    name: "status",
    label: "ACTIVAR/DESACTIVAR",
    align: "center",
    field: "status"
  }, {
    name: "binnacle",
    label: "BITÁCORAS",
    align: "center",
  }, {
    name: "follow",
    label: "SEGUIMIENTO",
    align: "center",
  }, {
    name: "options",
    label: "OPCIONES",
    align: "center",
  }
]);


async function loadDataAssignament() {
  loading.value = true;
  try {
    const response = await getData('/register/listallassignment');
    rows.value = response.data
  } catch (error) {
    notifyErrorRequest('Error al cargar las asignaciones');
  } finally {
    loading.value = false;
  }
}


async function searchApprentice() {
  try {
    const response = await getData(`/register/listregisterbyapprentice/${searchValue.value}`);
    rows.value = response.data;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const message = error.response?.data?.error || 'Error al buscar el aprendiz';
      notifyErrorRequest(message);
    }
    await loadDataAssignament()
  }
}
async function searchinstFollowup() {
  try {
    const response = await getData(`/register/listassigmentbyfollowupinstructor/${searchValue.value}`);
    rows.value = response.data;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      notifyErrorRequest('Error al buscar el instructor de seguimiento');
    }
  }
  await loadDataAssignament()
}

async function searchInstTechnical() {
  try {
    const response = await getData(`/register/listassigmentbytechnicalinstructor/${searchValue.value}`);
    rows.value = response;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
      const messageError = error.response?.data?.error || 'Error al buscar el instructor técnico';
      notifyErrorRequest(messageError);
    }
    await loadDataAssignament()
  }
}

async function searchInstProject() {
  try {
    const response = await getData(`/register/listassigmentbyprojectinstructor/${searchValue.value}`);
    rows.value = response;
  } catch (error) {
    if (searchValue.value === '') {
      validationSearch()
    } else {
    const messageError = error.response?.data?.error || 'Error al buscar el instructor de proyecto';
    notifyErrorRequest(messageError);
  }
  await loadDataAssignament()
}
}


const handleRadioChange = async () => {

  if (radioButtonList.value === 'apprentice') {
    const response = await getData('/apprendice/listallapprentice');
    optionSearch.value = response.map(option => ({
      _id: option._id,
      label: `${option.firstName} ${option.lastName} - ${option.numDocument}`,
      numDocument: option.numDocument
    }));
    filterOptionsSearch.value = optionSearch.value;

  } else if (radioButtonList.value === 'instFollowup') {
    const response = await getData('/register/listallregister');
    console.log(response)
    const uniqueInsFollowup = new Set();
    optionSearch.value = response.data.map(option => {
      const instFollowup = option.assignment[0].followUpInstructor[0].idInstructor;
      if (!uniqueInsFollowup.has(instFollowup)) {
        uniqueInsFollowup.add(instFollowup);
        return {
          _id: option.assignment[0].followUpInstructor[0].idInstructor,
          label: `${option.assignment[0].followUpInstructor[0].name} `,
        }
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;

  } else if (radioButtonList.value === 'instTechnical') {
    const response = await getData('/register/listallregister');
    const uniqueInsTechnical = new Set();
    optionSearch.value = response.data.map(option => {
      const instTechnical = option.assignment[0].technicalInstructor[0].idInstructor;
      if (!uniqueInsTechnical.has(instTechnical)) {
        uniqueInsTechnical.add(instTechnical);
        return {
          _id: option.assignment[0].technicalInstructor[0].idInstructor,
          label: `${option.assignment[0].technicalInstructor[0].name} `
        }
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;

  } else if (radioButtonList.value === 'instProject') {
    const response = await getData('/register/listallregister');
    const uniqueInstProject = new Set();
    optionSearch.value = response.data.map(option => {
      const instProject = option.assignment[0].projectInstructor[0].idInstructor;
      if (!uniqueInstProject.has(instProject)) {
        uniqueInstProject.add(instProject);
        return {
          _id: option.assignment[0].projectInstructor[0].idInstructor,
          label: `${option.assignment[0].projectInstructor[0].name} `,
        }
      }
    }).filter(option => option !== undefined);
    filterOptionsSearch.value = optionSearch.value;
    clearSearch();
  }
}

// limpiar campos de busqueda
function clearSearch() {
  searchValue.value = '';
}

function validationSearch() {
  if (searchValue.value === '') {
    notifyWarningRequest('El campo de busqueda no puede estar vacio');
    return;
  }
}

async function fetchDataSearch() {
  handleRadioChange()
}

fetchDataSearch()
async function filterFunctionSearch(val, update) {
  update(() => {
    const needle = val.toLowerCase();
    filterOptionsSearch.value = optionSearch.value.filter((option) =>
      option.label.toLowerCase().includes(needle)
    );
  });
}

async function searchDate() {
  validationSearch()
  if (radioButtonList.value === 'apprentice') {
    await searchApprentice()
  } else if (radioButtonList.value === 'instFollowup') {
    await searchinstFollowup()
  } else if (radioButtonList.value === 'instTechnical') {
    await searchInstTechnical()
  } else if (radioButtonList.value === 'instProject') {
    await searchInstProject()
  } else {
    await loadDataAssignament()
  }
  clearSearch();
}



function onclickButtonCreate() {
  isDialogVisibleModalAssignament.value = true;
  apprenticeName.value = true;
  labelTitle.value = 'CREAR UNA ASIGNACIÓN';
}

function onclickButtonAdd() {
  isDialogVisibleModalAssignament.value = true;
  apprenticeName.value = false;
  labelTitle.value = 'Añadir UNA ASIGNACIÓN';
}

function onclickButtonEdit() {
  isDialogVisibleModalAssignament.value = true;
  apprenticeName.value = false;
  labelTitle.value = 'EDITAR UNA ASIGNACIÓN';
}

async function handleSendCreate() {
  if (labelTitle.value === 'CREAR UNA ASIGNACIÓN') {
    validationDateFormCreate();
    handleSendCreateAssignament();
  } else if (labelTitle.value === 'EDITAR UNA ASIGNACIÓN') {
    validationDateFormEditAndAdd();
    handleSendEdit();
  } else if (labelTitle.value === 'Añadir UNA ASIGNACIÓN') {
    validationDateFormEditAndAdd();
    handleSendAdd();
  }
}

function validationDateFormCreate() {
  if (firstName.value === '' || idinstructorFollow.value === '' || idinstructortechnical.value === '' || idinstructorproject.value === '') {
    notifyWarningRequest('Todos los campos son obligatorios');
    return;
  }
}
function validationDateFormEditAndAdd() {
  if (idinstructorFollow.value === '' || idinstructortechnical.value === '' || idinstructorproject.value === '') {
    notifyWarningRequest('Todos los campos son obligatorios');
    return;
  }
}

async function handleSendCreateAssignament() {
  const dataAssignamen = {
    firstName: firstName.value,
    idinstructorFollow: idinstructorFollow.value,
    idinstructortechnical: idinstructortechnical.value,
    idinstructorproject: idinstructorproject.value,
  }

  const response = await postData(`/register/createassignment/${id}`, dataAssignamen);
  console.log(response);

  if (response.status === 200) {
    notifySuccessRequest('Asignación creada correctamente');
    loadDataAssignament();
    isDialogVisibleModalAssignament.value = false;
  } else {
    const messageError = error.response.data.erorrs[0].msg || 'Error al crear la asignación';
    notifyErrorRequest(messageError);
  }
}


async function handleSendEdit() {
  const dataAssignament = {
    idinstructorFollow: idinstructorFollow.value,
    idinstructortechnical: idinstructortechnical.value,
    idinstructorproject: idinstructorproject.value,
  }

  const response = await putData(`/register/updateassignment/${id}`, dataAssignament);
  console.log(response);

  if (response.status === 200) {
    notifySuccessRequest('Asignación actualizada correctamente');
    loadDataAssignament();
    isDialogVisibleModalAssignament.value = false;
  } else {
    const messageError = error.response.data.erorrs[0].msg || 'Error al actualizar la asignación';
    notifyErrorRequest(messageError);
  }
}


async function handleSendAdd() {
  const dataAssignament = {
    idinstructorFollow: idinstructorFollow.value,
    idinstructortechnical: idinstructortechnical.value,
    idinstructorproject: idinstructorproject.value,
  }
  const response = await putData(`/register/addassignment/${id}`, dataAssignament);
  console.log(response);

  if (reposne.status === 200) {
    notifySuccessRequest('Asignación añadida correctamente');
    loadDataAssignament();
    isDialogVisibleModalAssignament.value = false;
  } else {
    const messageError = error.response.data.erorrs[0].msg || 'Error al añadir la asignación';
    notifyErrorRequest(messageError);
  }

}
</script>


<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

#buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;

}

.filterButtons p {
  font-weight: bold;
  font-size: 11px;
  margin: 0px;
}


.formAssinament {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.AllButtonsSearch {
  display: flex;
  gap: 20px;
}

.InputButtonsSearch {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>
