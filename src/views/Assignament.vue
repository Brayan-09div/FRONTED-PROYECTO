<template>
  <Header title="Asignaciones"></Header>
  <ButtonAgregate nameButton="Agregar" title="Agregar Seguimiento">
    <q-input v-model="register" label="Asignación" filled /> <br>
    <q-input v-model="idinstructorFollow" label="Intructor Seguimiento" filled /> <br>
    <q-input v-model="idinstructortechnical" label="Intructor Tecnico" filled /> <br>
    <q-input v-model="idinstructorProyec" label="Intructor Proyecto" filled /> <br>
    <q-input v-model="certificationDoc" label="certificationDoc" filled /> <br>
    <q-input v-model="judymentPhoto" label="judymentPhoto" filled /> <br>
  </ButtonAgregate>
  <tableSelect :rows="rows" :props="props" :columns="columns" :title="title" :onClickEdit="openDialog"
    :toggleActivate="changestatus"></tableSelect>
</template>

<script setup>
import { ref } from "vue"
import Header from '../components/header/Header.vue';
import tableSelect from '../components/tables/tables.vue'
import ButtonAgregate from '../components/modal/modal.vue';

const columns = ref([
  {
    name: "register",
    label: "registro",
    field: "numero",
    align: "resgister",
  },
  {
    name: "followUpInstructor",
    required: true,
    label: "Instructor Seguimiento",
    align: "center",
    field: "followUpInstructor",
    sortable: true,
  },
  {
    name: "technicalInstructor",
    align: "center",
    label: "Intructor Técnico",
    field: "technicalInstructor",
    sortable: true,
  },
  {
    name: "projectInstructor",
    label: "Instructor Proyecto",
    align: "center",
    field: "projectInstructor"
  },
  {
    name: "certificationDoc",
    label: "Documento de Certificación",
    align: "center",
    field: "certificationDoc"
  }, {
    name: "judymentPhoto",
    label: "judymentPhoto",
    align: "center",
    field: "judymentPhoto"
  }, {
    name: "status",
    label: "Activar/Desactivar",
    align: "center",
    field: "status"
  },
  {
    name: "editar",
    label: "Editar",
    align: "center",
    field: "editar"
  },

]);

const rows = ref([
  {
    numero: "123",
    followUpInstructor: "Juan Perez",
    technicalInstructor: "Andres Hernandez",
    projectInstructor: "Julian Duran",
    certificationDoc: "Cerificado",
    judymentPhoto: "Foto",
    status: "1"
  },
  {
    numero: "124",
    followUpInstructor: "Juan Perez",
    technicalInstructor: "Juan Perez",
    projectInstructor: "Juan Perez",
    certificationDoc: "Cerificado",
    judymentPhoto: "Foto",
    status: 1
  },
  {
    numero: "125",
    followUpInstructor: "Juan Perez",
    technicalInstructor: "Juan Perez",
    projectInstructor: "Juan Perez",
    certificationDoc: "Cerificado",
    judymentPhoto: "Foto",
    estado: 0
  }
]);

function openDialog(row) {
  alert.value = true
  console.log(row);
}

function changestatus(row) {
  row.estado = row.estado === 1 ? 0 : 1;
}

</script>