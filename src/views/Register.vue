<template>
  <Header title="Registro"></Header>
  <createRegister nameButton="Agregar" title="Agregar Registro"  labelClose="Cerrar" labelSend="Enviar"
  :onclickClose="handleClose"  :onclickSend="handleSend">
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
  <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialog" :toggleActivate="changestatus">
  </CustomTable>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import CustomTable from '../components/tables/tables.vue';
import Header from '../components/header/header.vue';
import createRegister from '../components/modal/modal.vue';
import { notifyErrorRequest, notifySuccessRequest } from '../composables/useNotify'
import { getData, postData, putData } from '../services/ApiClient';


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



const rows = ref([])

onBeforeMount(() => {
  loadData();
});

async function loadData() {
  const response = await getData('/register/listallregister')
  console.log(response.data);
  rows.value = response.data
}

const columns = ref([
  {
    name: "startDate",
    label: "Fecha Inicial",
    field: "startDate",
    align: "center",
    sortable: true,
  }, {
    name: "endDate",
    label: "Fecha Final",
    field: "endDate",
    align: "center",
    sortable: true,
  }, {
    name: "company",
    label: "Compañia",
    field: "company",
    align: "center",
    sortable: true,
  },
  {
    name: "phoneCompany",
    label: "Telefono",
    align: "center",
    field: "phoneCompany",
    sortable: true,
  },
  {
    name: "addressCompany",
    align: "center",
    label: "Dirección",
    field: "addressCompany",
    sortable: true,
  }, {
    name: "mailCompany",
    align: "center",
    label: "Email",
    field: "mailCompany",
    sortable: true,
  },
  {
    name: "owner",
    align: "center",
    label: "Dueño",
    field: "owner",
    sortable: true,
  },
  {
    name: "hour",
    align: "center",
    label: "Horas",
    field: "hour",
    sortable: true,
  }, {
    name: "businessProyectHour",
    align: "center",
    label: "Horas Proyecto Empresarial",
    field: "businessProyectHour",
    sortable: true,
  }, {
    name: "productiveProjectHour",
    align: "center",
    label: "Horas de proyecto productivo",
    field: "productiveProjectHour",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status"
  }, {
    name: "editar",
    label: "Editar",
    align: "center",
    field: "editar"
  },
]);

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

</script>


<style></style>