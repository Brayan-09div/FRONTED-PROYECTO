<template>
  <Header title="Registro"></Header>

  <div id="buttons-container">
    <createRegister class="formRegister" nameButton="Agregar" title="Agregar Registro" labelClose="Cerrar"
      labelSend="Enviar" :onclickClose="handleClose" :onclickSend="handleSend" v-model:options="optionsSeeSearch">
      <q-input v-model="idApprentice" label="Aprendiz" filled /> <br>
      <q-input v-model="idModality" label="Modalidad" filled /> <br>
      <q-input v-model="startDate" label="Fecha Inicial" filled /> <br>
      <q-input v-model="endDate" label="Fecha Final" filled /> <br>
      <q-input v-model="company" label="Compañia" filled /> <br>
      <q-input v-model="phoneCompany" label="N° Telefono" filled /> <br>
      <q-input v-model="mailCompany" label="Email" filled /> <br>
      <q-input v-model="addressCompany" label="Direccióm" filled /> <br>
      <q-input v-model="owner" label="Dueño" filled /> <br>
      <q-input v-model="docAlternative" label="Documento Alternativo" filled /> <br>
      <q-input v-model="hour" label="Horas" filled /> <br>
      <q-input v-model="businessProyectHour" label="Horas de Proyecto Empresarial" filled /> <br>
      <q-input v-model="productiveProjectHour" label="Horas de Proyecto Productivo" filled /> <br>
    </createRegister>

    <div class="buttonsSearch">
      <div class="filterRadioButtons">
        <p>Realizar filtro por:</p>
        <radioButtonFiche v-model="radioButtonList" label="Ficha" val="fiche" @update:model-value="handleRadioChange">
        </radioButtonFiche>
        <radioButtonAppretice v-model="radioButtonList" label="Aprendiz" val="apprentice"
          @update:model-value="handleRadioChange"></radioButtonAppretice>
      </div>
      <inputSearch class="searchInput" v-model="searchValue" label="Ingrede el nombre o el numero de documento"
        @input="searchRegister"></inputSearch>
    </div>
  </div>

  <tableRegister 
  :props="props" 
  :rows="rows" 
  :columns="columns" 
  :onClickEdit="openDialogEdit"
  :onclickStatus="changeStatus"
  :loading="loading" />
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import Header from '../components/header/header.vue';
import createRegister from '../components/modal/modal.vue';
import { getData, postData, putData } from '../services/ApiClient';
import tableRegister from '../components/tables/tableEditStatusOptions3Buttons.vue'
import radioButtonAppretice from '../components/radioButtons/radioButton.vue';
import radioButtonFiche from '../components/radioButtons/radioButton.vue';
import inputSearch from '../components/input/inputSearch.vue';
import { formatDate } from '../utils/changeDateFormat';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';

// formulario de registro
let idApprentice = ref('')
let idModality = ref('')
let startDate = ref('')
let endDate = ref('')
let company = ref('')
let phoneCompany = ref('')
let addressCompany = ref('')
let mailCompany = ref('')
let owner = ref('')
let docAlternative = ref('')
let hour = ref('')
let businessProyectHour = ref('')
let productiveProjectHour = ref('')

// radio buttons
let searchValue = ref('')
let radioButtonList = ref('')

// spiner
let loading = ref(false)


const optionsSeeSearch = ref(false)
onBeforeMount(() => {
  loadData();
});


const rows = ref([])
const columns = ref([
  {
    name: "Num",
    label: "N°",
    align: "center",
    sortable: true,
  },
  {
    name: "name",
    label: "NOMBRE APRENDIZ",
    field: row => row.idApprentice[0] && row.idApprentice.length > 0 ? row.idApprentice[0].firstName + " " +
      row.idApprentice[0].lastName : 'No asignado',
    align: "name",
    sortable: true,
  }, {
    name: "numApprentice",
    label: "N° APRENDIZ",
    field: row => row.idApprentice ? row.idApprentice.length : 0,
    align: "center",
    sortable: true,
  }, {
    name: "program",
    label: "PROGRAMA",
    field: row => row.idApprentice[0].fiche ? row.idApprentice[0].fiche.name : 'No asignado',
    align: "center",
    sortable: true,
  },
  {
    name: "modality",
    label: "MODALIDAD",
    align: "center",
    field: row => row.idModality ? row.idModality.name : 'No asignado',
    sortable: true,
  },
  {
    name: "startDate",
    align: "center",
    label: "FECHA INICIO",
    field: row => formatDate(row.startDate),
    sortable: true,
  }, {
    name: "endDate",
    align: "center",
    label: "FECHA FIN",
    field: row => formatDate(row.endDate),
    sortable: true,
  }, {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status"
  },
  {
    name: "options",
    label: "OPCIONES",
    align: "center",
    field: "buttons"
  },
]);

async function loadData() {
  loading.value = true
  try {
    const response = await getData('/register/listallregister')
    console.log(response);
    rows.value = response.data
  } catch (error) {
    notifyErrorRequest('Error al cargar los registros')
  }finally{
    loading.value = false
  }

}
async function changestatus(row) {
  if (rows.status === 200) {
    await putData(`/register/enableregister/${row._id}`)
  } else {
    await putData(`/register/disableregister/${row._id}`)
  }
  row.status = row.status === 1 ? 0 : 1;
}

async function handleSend() {
  const response = await postData('/register/addregister', {
    idApprentice: idApprentice.value,
    idModality: idModality.value,
    startDate: startDate.value,
    endDate: endDate.value,
    company: company.value,
    phoneCompany: phoneCompany.value,
    addressCompany: addressCompany.value,
    mailCompany: mailCompany.value,
    owner: owner.value,
    docAlternative: docAlternative.value,
    hour: hour.value,
    businessProyectHour: businessProyectHour.value,
    productiveProjectHour: productiveProjectHour.value
  })
  if (response.status === 200) {
    loadData()
    notifySuccessRequest('Registro agregado correctamente')
  } else {
    notifyErrorRequest(`Error: ${error.response.data.error} ||  ${error.response.data.errors[0].msg}`)
  }

}

async function searchFiche() {
  try {
    const response = await getData(`/register/listregisterbyfiche/${searchValue.value}`)
    rows.value = response.data
  } catch (error) {
    const messageError = error.response.data.error || 'Error al buscar ficha'
    notifyErrorRequest(messageError)
  }
}

async function searchApprentice() {
  try {
    const response = await getData(`/register/listregisterbyapprentice/${searchValue.value}`)
    console.log(response);
    rows.value = response.data
  } catch (error) {
    const messageError = error.response.data.errors[0].msg || 'Error al buscar aprendiz'
    console.log(messageError);

    notifyErrorRequest(messageError)
  }
}

function handleRadioChange() {
  validationSearch()
  if (radioButtonList.value === 'fiche') {
    searchFiche()
  } else if (radioButtonList.value === 'apprentice') {
    searchApprentice()
  }
  clearSearch()
  clearRadioButtons()
}

function searchRegister() {
  if (radioButtonList.value === 'fiche') {
    searchFiche()
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
async function changeStatus(row) {
  if (row.status === 1) {
    await putData(`/register/disableregister/${row._id}`)
  } else {
    await putData(`/register/enableregister/${row._id}`)
  }

  row.status = row.status === 1 ? 0 : 1;
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

.filterRadioButtonsp {
  font-weight: bold;
  font-size: 11px;
  margin: 0px;
}


.formregister {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.buttonsSearch {
  display: flex;
  gap: 20px;
}
</style>