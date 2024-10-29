<template>
  <Header title="Seguimiento"></Header>
  <ButtonAgregate nameButton="Agregar" title="Agregar Seguimiento">
    <q-input v-model="assignament" label="Asignación" filled /> <br>
    <q-input v-model="idinstructor" label="IdIntructor" filled /> <br>
    <q-input v-model="instructor" label="Intructor" filled /> <br>
    <q-input v-model="number" label="Numero" filled /> <br>
    <q-input v-model="month" label="Mes" filled /> <br>
    <q-input v-model="document" label="Documento" filled /> <br>
    <q-input v-model="status" label="Estado" filled /> <br>
    <q-input v-model="observation" label="Observación" filled /> <br>
    <q-input v-model="user" label="Usuario" filled /> <br>
    <q-input v-model="observationDate" label="Fecha de la Observación" filled /> <br>
  </ButtonAgregate>

  <tableSelect 
  :props="props" 
  :rows="rows" 
  :columns="columns" 
  :onClickDetail="openClickDetail"  
  :onClickObservation="openClickObservation"/>

  <ModalDialog v-model="isModalDialogVisibleObservation" title="OBSERVACIONES" labelClose="close" aria-label="send"
    :onclickClose="closeModalDialog" :onclickSend="saveChanges">
    <div class="Observations">
      <p>No hay observaciones para esta seguimiento</p>
    </div>
  </ModalDialog>

  <ModalDialog v-model="isModalDialogVisibleDetail" title="DETALLE SEGUIMIENTO" labelClose="close" aria-label="send"
    :onclickClose="closeModalDialog" :onclickSend="saveChanges">
    <div class="detail">
      <p>No hay observaciones para esta seguimiento</p>
    </div>
  </ModalDialog>

</template>


<script setup>
import { ref } from 'vue';
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tableSelect.vue';
import ButtonAgregate from '../components/modal/modal.vue';
import ModalDialog from '../components/modal/dialogClose.vue';

let assignament = ref('');
let idinstructor = ref('');
let instructor = ref('');
let number = ref('');
let month = ref('');
let document = ref('');
let status = ref('');
let observation = ref('');
let user = ref('');
let observationDate = ref('');

let isModalDialogVisibleDetail = ref(false)
let isModalDialogVisibleObservation = ref(false)
const rows = ref([
  {
    name: "John Doe",
    number: "12345",
    month: "1",
    document: "ABC123",
    status: "1",
    users: "1",
    user: "johndoe",
    // observation: "Ninguna",
    observationDate: "2022-02-02"
  }, {
    name: "John Doe",
    number: "12345",
    month: "1",
    document: "ABC123",
    status: "1",
    users: "1",
    user: "johndoe",
    // observation: "Ninguna",
    observationDate: "2022-02-02"
  },
  {
    name: "John Doe",
    number: "12345",
    month: "1",
    document: "ABC13",
    status: "3",
    users: "1",
    user: "johndoe",
    // observation: "Ninguna",
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
    label: "PROXIMO SEGUIMIENTO",
    align: "center",
    field: "observationDate",
    sortable: true,
  },
  {
    name: "detalle",
    label: "DETALLES",
    align: "center",
    field: "detalle",
    sortable: true,
  }
])
async function openClickObservation() {
  isModalDialogVisibleObservation.value=true
}

async function openClickDetail() {
  isModalDialogVisibleDetail.value = true
}
</script>


<style>
.detail p {
  padding: 10px;
  background-color: rgb(215, 213, 209);
}
</style>