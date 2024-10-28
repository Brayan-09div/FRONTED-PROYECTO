<template>
  <Header title="Bitacoras"></Header>
  <ButtonAgregate :title="title" nameButton="Agregar"  >
    <q-input v-model="assignament" label="Asignación" filled /> <br>
    <q-input v-model="idinstructor" label="IdIntructor" filled /> <br>
    <q-input v-model="instructor" label="Intructor" filled /> <br>
    <q-input v-model="number" label="Numero" filled /> <br>
    <q-input v-model="status" label="Estado" filled /> <br>
    <q-input v-model="observation" label="Observación" filled /> <br>
    <q-input v-model="user" label="Usuario" filled /> <br>
    <q-input v-model="observationDate" label="Fecha de la Observación" filled /> <br>
  </ButtonAgregate>
  <tableSelect :props="props" :rows="rows" :columns="columns" :title="title"  :onClickEdit="openDialog"></tableSelect>
<Dialog v-model="isDialogVisible" title="Editar Bitacora" labelClose="close" aria-label="send" :on :onclickClose="closeDialog" :onclickSend="saveChanges">
  <q-input v-model="assignament" label="Asignación" filled /> <br>
    <q-input v-model="idinstructor" label="IdIntructor" filled /> <br>
    <q-input v-model="instructor" label="Intructor" filled /> <br>
    <q-input v-model="number" label="Numero" filled /> <br>
    <q-input v-model="status" label="Estado" filled /> <br>
    <q-input v-model="observation" label="Observación" filled /> <br>
    <q-input v-model="user" label="Usuario" filled /> <br>
    <q-input v-model="observationDate" label="Fecha de la Observación" filled /> <br>
</Dialog>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tableSelect.vue'
import { getData } from '../services/ApiClient';
import ButtonAgregate from '../components/modal/modal.vue';
// import ButtonEdtitar from '../components/modal/modal.vue';
const title = ref("Lista de Bitacoras");
import Dialog from '../components/modal/dialog.vue'

let assignament = ref('');
let idinstructor = ref('');
let instructor = ref('');
let number = ref('');
let status = ref('');
let observation = ref('');
let user = ref('');
let observationDate = ref('');

const isDialogVisible = ref(false);
// onBeforeMount(() => {
//   loadData();
// });
// async function loadData() {
//   const response = await getData('')
//   rows.value = response
// }


const rows = ref([{
  name: "John Doe",
  number: "12345",
  document: "ABC123",
  status: "1",
  user: "johndoe",
  observation: "Ninguna",
  observationDate: "2022-02-02"
},
{
  name: "Jane Smith",
  number: "67890",
  document: "XYZ789",
  status: "1",
  user: "janesmith",
  observation: "Ninguna",
  observationDate: "2022-02-02"
},
{
  name: "Alice Johnson",
  number: "11223",
  document: "LMN456",
  status: "1",
  user: "alicejohnson",
  observation: "Ninguna",
  observationDate: "2022-02-02"
}]);

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
    field: "name",
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
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },{
    name: "observation",
    label: "Observación ",
    align: "center",
    field: "observation",
    sortable: true,
  },{
    name: "añadir",
    label: "AÑADIR",
    align: "center",
    field: "añadir",
    sortable: true,
  },{
    name: "detalle",
    label: "Detalle",
    align: "center",
    field: "detalle",
    sortable: true,
  },
])
function openDialog(){
  isDialogVisible.value = true;
}
</script>

<style>
/* Estilos adicionales si es necesario */
</style>
