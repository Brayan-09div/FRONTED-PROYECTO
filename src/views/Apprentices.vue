<template>
  <Header title="Aprendices"></Header>
  <ModalDialog nameButton="Crear" title="Crear Aprendiz Sena" labelClose="Cerrar" labelSend="Guardar"
    :onclickClose="handleClose" :onclickSend="handleSend">
    <q-select v-model="fiche" :options="filterOptions" label="Ficha" emit-value map-options option-label="fiche"
      option-value="_id" use-input @filter="filterFunction" class="custom-select" use-chips filled></q-select><br>
    <q-input v-model="firstName" label="Nombres Aprendiz" filled /> <br>
    <q-input v-model="lastName" label="Apellido Aprendiz" filled /> <br>
    <q-input v-model="email" label="Email Personal Aprendiz" filled /> <br>
    <q-input v-model="email" label="Email Institucional Aprendiz" filled /> <br>
    <q-input v-model="phone" label="Telefono Aprendiz" filled /> <br>
    <q-select square filled v-model="tpDocument" :options="options" label="Tipo de Documento" /><br>
    <q-input v-model="numDocument" label="N° Documento" filled /> <br>
    <q-input v-model="modality" icon="settings" label=" Modalidad Etapa Productiva" filled /> <br>
    <q-input  icon="school" v-model="modality"  label="Modalidad Etapa Productiva" filled /> <br>
  </ModalDialog>
    <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialogEdit"
      :toggleActivate="changestatus">
    </CustomTable>

  <editApprentice v-model="isDialogVisible" >
    <q-select v-model="fiche" :options="filterOptions" label="Ficha" emit-value map-options option-label="fiche"
      option-value="_id" use-input @filter="filterFunction" class="custom-select" use-chips filled></q-select><br>
    <q-input v-model="firstName" label="Nombres Aprendiz" filled /> <br>
    <q-input v-model="lastName" label="Apellido Aprendiz" filled /> <br>
    <q-input v-model="email" label="Email Personal Aprendiz" filled /> <br>
    <q-input v-model="email" label="Email Institucional Aprendiz" filled /> <br>
    <q-input v-model="phone" label="Telefono Aprendiz" filled /> <br>
    <q-select square filled v-model="tpDocument" :options="options" label="Tipo de Documento" /><br>
    <q-input v-model="numDocument" label="N° Documento" filled /> <br>
  </editApprentice>

</template>

<script setup>
import CustomTable from "../components/tables/tableEditStatusOptions.vue";
import { onBeforeMount, ref } from "vue";
import Header from "../components/header/header.vue";
import { getData, postData, putData } from '../services/ApiClient.js';
import ModalDialog from '../components/modal/modal.vue';
import editApprentice from '../components/modal/dialog.vue';
import Modality from "./Modality.vue";


const rows = ref([]);
let firstName = ref('')
let lastName = ref('')
let email = ref('')
let phone = ref('')
let tpDocument = ref('')
let numDocument = ref('')
let fiche = ref('')

const isDialogVisible = ref(false);
const options = [
  'C.C', 'T.I', 'C.E', 'S.C.R', 'P.A'
]

onBeforeMount(() => {
  loadData();
});

const loadData = async () => {
  const response = await getData('/apprendice/listallapprentice');
  console.log(response);
  rows.value = response
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
    field: "fiche.name",
    sortable: true,
  },
  {
    name: "fiche.number",
    align: "center",
    label: "COD.FICHA",
    field: "fiche.number",
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status"
  },
  {
    name: "opcion",
    label: "OPCIONES",
    align: "center",
    field: "opcion"
  },
]);

function openDialogEdit(row) {
  isDialogVisible.value = true;
}

async function changestatus(row) {
  if (row.status === 1) {
    await putData(`/apprendice/disableapprentice/${row._id}`);
  } else {
    await putData(`/apprendice/enableapprentice/${row._id}`);
  }
  row.status = row.status === 1 ? 0 : 1;
}

async function handleSend() {
  const response = await postData('/apprentice', {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    phone: phone.value,
    tpdocument: tpDocument.value,
    numdocument: numDocument.value,
    fiche: fiche.value
  })
}

</script>

<style></style>