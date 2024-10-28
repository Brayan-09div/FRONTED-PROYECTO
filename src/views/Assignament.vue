<template>
  <Header title="Mis Asignaciones"></Header>
  <ButtonAgregate nameButton="Agregar" title="Agregar Seguimiento">
    <q-input v-model="register" label="Asignación" filled /> <br>
    <q-input v-model="idinstructorFollow" label="Intructor Seguimiento" filled /> <br>
    <q-input v-model="idinstructortechnical" label="Intructor Tecnico" filled /> <br>
    <q-input v-model="idinstructorProyec" label="Intructor Proyecto" filled /> <br>
    <q-input v-model="certificationDoc" label="certificationDoc" filled /> <br>
    <q-input v-model="judymentPhoto" label="judymentPhoto" filled /> <br>
  </ButtonAgregate>
    <TableOptions :rows="rows" :props="props" :columns="columns" :title="title"
    :toggleActivate="changestatus" ></TableOptions>
</template>

<script setup>
import { ref } from "vue"
import Header from '../components/header/Header.vue';
import ButtonAgregate from '../components/modal/modal.vue';
import TableOptions from "../components/tables/tableStatus.vue";

const columns = ref([
{
    name: "Num",
    label: "N°",
    field: "numero",
    align: "center",
  },
  {
    name: "register",
    label: "REGISTRO",
    field: "numero",
    align: "resgister",
  },
  {
    name: "followUpInstructor",
    required: true,
    label: "INSTRUCTOR SEGUIMIENTO",
    align: "center",
    field: "followUpInstructor",
    sortable: true,
  },
  {
    name: "technicalInstructor",
    align: "center",
    label: "INTRUCTOR TECNICO",
    field: "technicalInstructor",
    sortable: true,
  },
  {
    name: "projectInstructor",
    label: "INTRUCTOR PROYECTO",
    align: "center",
    field: "projectInstructor"
  },
  {
    name: "certificationDoc",
    label: "DOCUMENTO CERTIFICACION",
    align: "center",
    field: "certificationDoc"
  }, {
    name: "judymentPhoto",
    label: "FOTO",
    align: "center",
    field: "judymentPhoto"
  }, {
    name: "status",
    label: "ACTIVAR/DESACTIVAR",
    align: "center",
    field: "status"
  }
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