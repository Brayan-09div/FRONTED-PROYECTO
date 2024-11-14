<template>
  <Header title="Aprendices"></Header>
  <div id="buttons-container">
    <div class="buttons">
      <ModalDialog class="formApprentice" :title="modalTitle" v-model="isDialogVisibleModal" nameButton="Crear"
        labelClose="Cerrar" labelSend="Guardar" :onclickClose="handleClose" :onclickSend="handleSend"
        :openModalButton="openButtonCreate">

        <div class="formApprentice">

          <q-select v-model="fiche" :options="filterOptions" label="Ficha" emit-value map-options option-label="label"
            option-value="_id" :use-input="!fiche" @filter="filterFunctionFiches" class="custom-select" use-chips  :rules="[
                  (val) => !!val || 'La ficha es obligatoria'  //Asegúrese de que haya un archivo seleccionado
                ]"
            filled > <template v-slot:prepend class="custom-select">
              <q-icon name="abc" />
            </template>
          </q-select>

          <q-input v-model="firstName" label="Nombres Aprendiz"  :rules="[ruleNameAppretice]" filled>
            <template v-slot:prepend>
              <q-icon name="abc" />
            </template>
          </q-input>

          <q-input v-model="lastName" label="Apellidos Aprendiz"  :rules="[ruleLastNameAppretice]" filled before="person">
            <template v-slot:prepend>
              <q-icon name="abc" />
            </template>
          </q-input>

          <q-select square filled v-model="tpDocument" :options="optionsTpC"  :rules="[ruleTpAppretice]" label="Tipo de Documento" />

          <q-input v-model="numDocument" label="N° Documento"  :rules="[ruleNumberAppretice]" filled>
            <template v-slot:prepend>
              <q-icon name="pin" />
            </template>
          </q-input>

          <q-input v-model="emailPersonal" label="Email Personal Aprendiz"  :rules="[ruleEmailPersonalAppretice]" filled>
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input v-model="emailIntitutional" label="Email Institucional Aprendiz"  :rules="[ruleEmailInstitutionalAppretice]" filled>
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input v-model="phone" label="Telefono Aprendiz"  :rules="[rulephoneAppretice]" filled>
            <template v-slot:prepend>
              <q-icon name="pin" />
            </template>
          </q-input>

          <q-input v-model="idmodality" v-show="inputIdmodality" label=" Modalidad Etapa Productiva"  :rules="[ruleModalityAppretice]" filled>
            <template v-slot:prepend>
              <q-icon name="settings" />
            </template>
          </q-input>
        </div>
      </ModalDialog>
      <buttonuploadFile nameButton="Subir"></buttonuploadFile>
    </div>

    <div class="buttonssearch">
      <div class="filterButtons">
        <p>Seleccione una opción:</p>
        <div class="radio-buttons">
          <radioButtonFiche v-model="radiobuttonlist" label="Ficha" val="Fiche"
            @update:model-value="handleRadioChange" />
          <radioButtonAppretice v-model="radiobuttonlist" label="Aprendiz" val="Appretice"
            @update:model-value="handleRadioChange" />
          <radioButtonStatus v-model="radiobuttonlist" label="Estado" val="Status"
            @update:model-value="handleRadioChange" />
        </div>
      </div>

      <inputSearch class="search-container" v-model="searchValue" :label="searchLabel" @input="searchApprentices" />
    </div>
  </div>
  <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialogEdit"
    :toggleActivate="changestatus" :onclickStatus="changestatusIcon">
  </CustomTable>


</template>

<script setup>
import CustomTable from "../components/tables/tableEditStatusOptions.vue";
import { ref, onBeforeMount, onMounted } from "vue";
import Header from "../components/header/header.vue";
import { getData, postData, putData } from '../services/ApiClient.js';
import ModalDialog from '../components/modal/modal.vue';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';
import radioButtonAppretice from "../components/radioButtons/radioButton.vue";
import radioButtonFiche from "../components/radioButtons/radioButton.vue";
import radioButtonStatus from "../components/radioButtons/radioButton.vue";
import inputSearch from "../components/input/inputSearch.vue";
import buttonuploadFile from "../components/buttons/Button.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

// onMounted(async () => {

//   if (ficheId) {
//    await loadData(ficheId)
//   }else{
//     loadData();
//   }
// });

onBeforeMount(() => {
loadData()
});


onMounted(() => {
  loadDataApprenticeFiche();
});

const loadDataApprenticeFiche = async () => {
  const ficheId = route.query.ficheId;
  const response = await getData(`/apprendice/listapprenticebyfiche/${ficheId}`);
  rows.value = response;
}

const loadData = async () => {
 const response = await getData('/apprendice/listallapprentice');
  rows.value = response;
}

// Variables
const rows = ref([]);

// Date form Apprentice
let firstName = ref('')
let lastName = ref('')
let emailPersonal = ref('')
let emailIntitutional = ref('')
let phone = ref('')
let tpDocument = ref('')
let numDocument = ref('')
let fiche = ref('')
let idmodality = ref('')
let row_id = ref('')

// raadio button
let radiobuttonlist = ref('');
let searchValue = ref('')
let searchLabel = ref('')

// modals
let isDialogVisibleModal = ref(false)
let ismodalType = ref(true)
let modalTitle = ref(ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz')

// filtro de fichas
const options = ref([]);
const filterOptions = ref([]);

// visivilidad del input
let inputIdmodality = ref(false)



const optionsTpC = [
  'C.C', 'T.I', 'C.E', 'S.C.R', 'P.A'
]




const columns = ref([
  {
    name: "Num",
    label: "N°",
    field: "Num",
    align: "center",
    sortable: true,
  },
  {
    name: "firstName",
    label: "NOMBRE APRENDIZ",
    field: "firstName",
    align: "center",
    sortable: true,
  },
  {
    name: "tpDocument",
    align: "center",
    label: "TIPO DOCUMENTO",
    field: "tpDocument",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "N° DOCUMENTO",
    field: "numDocument",
    sortable: true,
  },
  {
    name: "personalEmail",
    align: "center",
    label: "EMAIL PERSONAL",
    field: "personalEmail",
    sortable: true,
  },
  {
    name: "institutionalEmail",
    align: "center",
    label: "EMAIL INSTITUCIONAL",
    field: "institutionalEmail",
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "TEL",
    field: "phone",
    sortable: true,
  },
  {
    name: "fiche.name",
    align: "center",
    label: "FICHA",
    field: row => row.fiche.name, // Accede al nombre de la ficha
    sortable: true,
  },
  {
    name: "fiche.number",
    align: "center",
    label: "COD.FICHA",
    field: row => row.fiche.number, // Accede al número de la ficha
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "opcion",
    label: "OPCIONES",
    align: "center",
    field: "opcion",
    sortable: true,
  }
]);

// Validaciones con rules
const ruleNameAppretice = (val) => !!val || "Este campo es requerido";
const ruleLastNameAppretice = (val) => !!val || "Este campo es requerido";
const ruleTpAppretice = (val) => !!val || "Este campo es requerido";
const ruleNumberAppretice = (val) => !!val || "Este campo es requerido";
const ruleEmailPersonalAppretice = (val) => !!val || "Este campo es requerido";
const ruleEmailInstitutionalAppretice = (val) => !!val || "Este campo es requerido";
const rulephoneAppretice = (val) => !!val || "Este campo es requerido";
const ruleModalityAppretice = (val) => !!val || "Este campo es requerido";


function resetForm() {
  firstName.value = '';
  lastName.value = '';
  emailPersonal.value = '';
  emailIntitutional.value = '';
  phone.value = '';
  tpDocument.value = '';
  numDocument.value = '';
  fiche.value = '';
  idmodality.value = '';
}

async function changestatus(row) {
  if (row.status === 1) {
    await putData(`/apprendice/disableapprentice/${row._id}`);
  } else {
    await putData(`/apprendice/enableapprentice/${row._id}`);
  }
  row.status = row.status === 1 ? 0 : 1;
}


async function changestatusIcon(row) {
  if (row.status === 1) {
    await putData(`/apprendice/disableapprentice/${row._id}`);
  } else {
    await putData(`/apprendice/enableapprentice/${row._id}`);
  }
  row.status = row.status === 1 ? 0 : 1;
}

// function openCloseModal(){
//   isDialogVisibleModal.value = false;
// }

function openButtonCreate() {
  ismodalType.value = true;
  isDialogVisibleModal.value = true;
  inputIdmodality.value = true;
  modalTitle.value = ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz';
  resetForm();
}

function openDialogEdit(row) {
  isDialogVisibleModal.value = true;
  ismodalType.value = false;
  inputIdmodality.value = false;
  modalTitle.value = ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz';
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  emailPersonal.value = row.personalEmail;
  emailIntitutional.value = row.institutionalEmail;
  phone.value = row.phone;
  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  fiche.value = row.fiche.idFiche;
  row_id.value = row._id;
}

function handleClose() {
  ismodalType.value = false
  resetForm();
}


const handleSend = async () => {
  if(ruleNameAppretice.value || ruleLastNameAppretice.value || ruleTpAppretice.value || ruleNumberAppretice.value || ruleEmailPersonalAppretice.value || ruleEmailInstitutionalAppretice.value || rulephoneAppretice.value || ruleModalityAppretice.value){
    return;
  }
  if (!firstName.value || !lastName.value || !emailPersonal.value || !emailIntitutional.value
    || !phone.value || !tpDocument.value || !numDocument.value || !fiche.value) {
    notifyWarningRequest('Todos los campos son obligatorios');
    return;
  }

  const selectedFiche = filterOptions.value.find((opt) => opt._id === fiche.value);

  const apprendiceData = {
    firstName: firstName.value,
    lastName: lastName.value,
    personalEmail: emailPersonal.value,
    institutionalEmail: emailIntitutional.value,
    phone: phone.value,
    tpDocument: tpDocument.value,
    numDocument: numDocument.value,
    fiche: {
      idFiche: fiche.value,
      name: selectedFiche.name,
      number: selectedFiche.number,
    },
    idModality: idmodality.value
  };

  const apprendiceDataUpdate = {
    firstName: firstName.value,
    lastName: lastName.value,
    personalEmail: emailPersonal.value,
    institutionalEmail: emailIntitutional.value,
    phone: phone.value,
    tpDocument: tpDocument.value,
    numDocument: numDocument.value,
    fiche: {
      name: selectedFiche.name,
      number: selectedFiche.number,
    },
  };


  try {
    let result;
    if (ismodalType.value) {

      result = await postData('/apprendice/addapprentice', apprendiceData);
    } else {
      result = await putData(`/apprendice/updateapprenticebyid/${row_id.value}`, apprendiceDataUpdate);
    }
    // Consideramos cualquier respuesta como exitosa si no hay un error explícito
    notifySuccessRequest(ismodalType.value ? 'Aprendiz creado correctamente' : 'Aprendiz actualizado correctamente');
    isDialogVisibleModal.value = false;
    ismodalType.value = false;
    resetForm();
    await loadData();
  } catch (error) {
    notifyErrorRequest(`Error: ${error.response.data.errors[0].msg} || ${error.response.data.message}  || 'Ocurrió un error inesperado' `);
    ismodalType.value = false;
  }
};


// filtro de fichas
async function fetchDataFiche() {
  const response = await getData('/repfora/fiches');
  options.value = response.map(option => ({   //aca es donde se guardan todas las opciones
    _id: option._id, // Este será el valor del <q-select>
    label: `${option.program.name} - ${option.program.code}`, // Crea un campo `label` con la combinación deseada
    name: option.program.name, // Se guarda el Nombre de la ficha
    number: option.program.code, // Se guarda el Código de la ficha
  }));
  filterOptions.value = options.value; // Opciones iniciales filtrada

}

fetchDataFiche();

async function filterFunctionFiches(val, update) {
  if (val === " ") {
    update(() => {
      filterOptions.value = filterOptions.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filterOptions.value = options.value.filter((option) =>
      option.label.toLowerCase().includes(needle) // Filtramos por label que contiene name - number
    );
  });
}

// Función para actualizar el label del input de búsqueda
function updateSearchLabel() {
  if (radiobuttonlist.value === 'fiche') {
    searchLabel.value = 'Buscar por ficha';
  } else if (radiobuttonlist.value === 'apprentice') {
    searchLabel.value = 'Buscar por aprendiz';
  } else if (radiobuttonlist.value === 'status') {
    searchLabel.value = 'Buscar por estado';
  } else {
    searchLabel.value = 'Buscar';
  }
}

// listar por radio button
async function listApprenticeForFiches() {
  const response = await getData(`/apprendice/listapprenticebyfiche/${searchValue.value}`);
  rows.value = response;
}

async function listApprenticeForApprentice() {
  const response = await getData(`/apprendice/listapprenticebyid/${searchValue.value}`);
  rows.value = response;
}

async function listApprenticeForStatus() {
  const response = await getData(`/apprendice/listapprenticebystatus/${searchValue.value}`);
  rows.value = response.data;
  console.log(response);
}

const handleRadioChange = async () => {
  // Función para actualizar el label del input de búsqueda
  updateSearchLabel()
  if (radiobuttonlist.value === 'Fiche') {
    searchLabel.value = 'Buscar por ficha';
    await listApprenticeForFiches();
  } else if (radiobuttonlist.value === 'Appretice') {
    searchLabel.value = 'Buscar por aprendiz';
    await listApprenticeForApprentice();
  } else if (radiobuttonlist.value === 'Status') {
    searchLabel.value = 'Buscar por estado';
    await listApprenticeForStatus();
  } else {
    searchLabel.value = 'Buscar';
  }
}


// Buscardor ractivo 
const searchApprentices = async () => {
  if (radioButtonAppretice.value === 'Fiche') {
    await listApprenticeForFiches();
  } else if (radioButtonAppretice.value === 'Appretice') {
    await listApprenticeForApprentice();
  } else if (radioButtonAppretice.value === 'Status') {
    await listApprenticeForStatus();
  }
};



</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.formApprentice,
.formEditApprentice {
  display: flex;
  flex-direction: column;
  /* display: grid; */
  gap: 20px;
  /* grid-template-columns: 1fr 1fr; */
}


.filterButtons p {
  font-weight: bold;
  font-size: 11px;
  margin: 0px;
}

#buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

.buttons {
  display: flex;
  gap: 20px;
}

.buttonssearch {
  display: flex;
  gap: 20px;
}



.search-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
</style>
