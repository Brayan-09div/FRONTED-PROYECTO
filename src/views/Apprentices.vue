<template>
  <Header title="Aprendices"></Header>

  <div id="buttons">
  <ModalDialog class="formApprentice" :title="modalTitle" v-model="isDialogVisibleModal" nameButton="Crear"
    labelClose="Cerrar" labelSend="Guardar" :onclickClose="handleClose" :onclickSend="handleSend">

    <div class="formApprentice">

      <q-select v-model="fiche" :options="filterOptions" label="Ficha" emit-value map-options option-label="label"
        option-value="_id" use-input @filter="filterFunctionFiches" class="custom-select" use-chips filled> <template
          v-slot:prepend>
          <q-icon name="abc" />
        </template>
      </q-select>

      <q-input v-model="firstName" label="Nombres Aprendiz" filled>
        <template v-slot:prepend>
          <q-icon name="abc" />
        </template>
      </q-input>

      <q-input v-model="lastName" label="Apellidos Aprendiz" filled before="person">
        <template v-slot:prepend>
          <q-icon name="abc" />
        </template>
      </q-input>

      <q-select square filled v-model="tpDocument" :options="optionsTpC" label="Tipo de Documento" />

      <q-input v-model="numDocument" label="N° Documento" filled>
        <template v-slot:prepend>
          <q-icon name="pin" />
        </template>
      </q-input>

      <q-input v-model="emailPersonal" label="Email Personal Aprendiz" filled>
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input v-model="emailIntitutional" label="Email Institucional Aprendiz" filled>
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input v-model="phone" label="Telefono Aprendiz" filled>
        <template v-slot:prepend>
          <q-icon name="pin" />
        </template>
      </q-input>

      <q-input v-model="idmodality" label=" Modalidad Etapa Productiva" filled>
        <template v-slot:prepend>
          <q-icon name="settings" />
        </template>
      </q-input>
    </div>
  </ModalDialog>

  <div class="filterButtons" >
    <p>Seleccione una opción:</p>
    <div class="radio-buttons">
    <radioButtonFiche v-model="radiobuttonlist" label="Ficha" val="Fiche"></radioButtonFiche>
    <radioButtonAppretice v-model="radiobuttonlist" label="Aprendiz" val="Appretice"></radioButtonAppretice>
    <radioButtonStatus v-model="radiobuttonlist" label="Estado" val="status"></radioButtonStatus>
  </div>
  </div>

  <inputSearch class="search-container"></inputSearch>

</div>
  <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialogEdit"
    :toggleActivate="changestatus" :onclickStatus="changestatusIcon">
  </CustomTable>


</template>

<script setup>
import CustomTable from "../components/tables/tableEditStatusOptions.vue";
import { onBeforeMount, ref, TransitionGroup } from "vue";
import Header from "../components/header/header.vue";
import { getData, postData, putData } from '../services/ApiClient.js';
import ModalDialog from '../components/modal/modal.vue';
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from '../composables/useNotify.js';
import radioButtonAppretice from "../components/radioButtons/radioButton.vue";
import radioButtonFiche from "../components/radioButtons/radioButton.vue";
import radioButtonStatus from "../components/radioButtons/radioButton.vue";
import inputSearch from "../components/input/inputSearch.vue";
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
let radiobuttonlist = ref('Appretice')

// modals
let isDialogVisibleModal = ref(false)
let ismodalType = ref(true)
let modalTitle = ref(ismodalType.value ? 'Crear Aprendiz' : 'Editar Aprendiz')

// filtro de fichas
const options = ref([]);
const filterOptions = ref([]);



const optionsTpC = [
  'C.C', 'T.I', 'C.E', 'S.C.R', 'P.A'
]

onBeforeMount(() => {
  loadData();
  fetchDataFiche()

});

const loadData = async () => {
  const response = await getData('/apprendice/listallapprentice');
  console.log(response);
  rows.value = response; // Asegúrate de que los datos se asignen correctamente
};

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

function openDialogEdit(row) {
  // isDialogVisible.value = true;
  isDialogVisibleModal.value = true;
  ismodalType.value = false;
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  emailPersonal.value = row.personalEmail;
  emailIntitutional.value = row.institutionalEmail;
  phone.value = row.phone;
  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  fiche.value = row.fiche.idFiche;
  row_id = row._id;

}

function handleClose() {
  modeltype.value = false
  resetForm();
}

async function handleSend() {
  if (!firstName.value || !lastName.value ||
    !emailPersonal.value || !emailPersonal.value
    || !phone.value || !tpDocument.value || !numDocument.value || !fiche.value) {
    notifyWarningRequest('Todos los campos son obligatorios')
    isDialogVisibleModal.value = true;
  }

  const selectedFiche = filterOptions.value.find((opt) => opt._id === fiche.value); // Aca se Busca los datos de la ficha seleccionada

  const apprendiceData = {
    firstName: firstName.value,
    lastName: lastName.value,
    personalEmail: emailPersonal.value,
    institutionalEmail: emailIntitutional.value,
    phone: phone.value,
    tpDocument: tpDocument.value,
    numDocument: numDocument.value,
    fiche: {
      idFiche: fiche.value, // El ID de la ficha
      name: selectedFiche.name, // El nombre de la ficha
      number: selectedFiche.number, // El número de la ficha
    },
    idModality: idmodality.value
  }

  let response;
  if (ismodalType.value === true) {
    response = await postData('/apprendice/addapprentice', apprendiceData)
  } else {
    response = await putData(`/apprendice/updateapprenticebyid/${row_id.value}`, apprendiceData);
  }

  if (response && response.status === 200) {
    notifySuccessRequest(ismodalType.value ? 'Aprendiz creado correctamente' : 'Aprendiz actualizado correctamente');
    isDialogVisibleModal.value = false;
    resetForm();
    loadData();
  } else {
    notifyErrorRequest(`Error: ${response.data.message}`);
    isDialogVisibleModal.value = true;
  }
  loadData();
}
async function fetchDataFiche() {
  const response = await getData('/repfora/fiches');

  options.value = response.map(option => ({   //aca es donde se guardan todas las opciones
    _id: option._id, // Este será el valor del <q-select>
    label: `${option.program.name} - ${option.number}`, // Crea un campo `label` con la combinación deseada
    name: option.program.name, // Se guarda el Nombre de la ficha
    number: option.number, // Se guarda el Código de la ficha
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





</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.formApprentice,
.formEditApprentice {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}


.filterButtons p {
  font-weight: bold;
  font-size:11px ;
  margin: 0px;
}

#buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

/* .search-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
} */
 

.search-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

</style>
