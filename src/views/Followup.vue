<template>
  <Header title="Seguimiento"></Header>
  <ButtonAgregate nameButton="Agregar" title="Agregar Seguimiento" >
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
  <tableSelect :props="props" :rows="rows" :columns="columns"></tableSelect>
</template>


<script setup>
import { ref } from 'vue';
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tableSelect.vue';
import ButtonAgregate from '../components/modal/modal.vue';

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
const rows = ref([
  {
    assignment: "1",
    instructor: "John Doe",
    number: "12345",
    month: "1",
    document: "ABC123",
    status: "1",
    users: "1",
    user: "johndoe",
    observation: "Ninguna",
    observationDate: "2022-02-02"
  }, {
    assignment: "1",
    instructor: "John Doe",
    number: "12345",
    month: "1",
    document: "ABC123",
    status: "1",
    users: "1",
    user: "johndoe",
    observation: "Ninguna",
    observationDate: "2022-02-02"
  },
  {
    assignment: "1",
    instructor: "John Doe",
    number: "12345",
    month: "1",
    document: "ABC123",
    status: "1",
    users: "1",
    user: "johndoe",
    observation: "Ninguna",
    observationDate: "2022-02-02"
  }
])

const columns = ref([
  {
    name: "assignment",
    label: "Asignación",
    align: "center",
    field: "assignment",
    sortable: true,
  },
  {
    name: "instructor",
    label: "Instructor",
    align: "center",
    field: "instructor",
    sortable: true,
  },
  {
    name: "number",
    label: "Numero",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "month",
    label: "mes",
    align: "center",
    field: "month",
    sortable: true,
  },
  {
    name: "document",
    label: "Documento",
    align: "center",
    field: "document",
    sortable: true,
  }, {
    name: "users",
    label: "Usuarios",
    align: "center",
    field: "users",
    sortable: true,
  },
  {
    name: "user",
    label: "Usuario",
    align: "center",
    field: "user",
    sortable: true,
  },
  {
    name: "observation",
    label: "Observación",
    align: "center",
    field: "observation",
    sortable: true,
  },
  {
    name: "observationDate",
    label: "Fecha de Observación",
    align: "center",
    field: "observationDate",
    sortable: true,
  }, {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status",
    sortable: true,
  }, {
    name: "editar",
    label: "Esditar",
    align: "center",
    field: "editar",
    sortable: true,
  },
])
</script>


<style></style>