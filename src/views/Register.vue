<template>
  <Header title="Registro"></Header>
  <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialog" :toggleActivate="changestatus">
  </CustomTable>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import CustomTable from '../components/tables/tables.vue';
import Header from '../components/header/header.vue';
import { getData } from '../services/ApiClient';


onBeforeMount(() => {
  loadData();
});

async function loadData(){
  const response = await getData('/listallregister')
  console.log(response);
  rows.value = response
}


const rows = ([])
const columns = ref([
  {
    name: "starDate",
    label: "Fecha Inicial",
    field: "starDate",
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
    label: "Email",
    field: "addressCompany",
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
    name: "docAlternative",
    align: "center",
    label: "Documento",
    field: "docAlternartive",
    sortable: true,
  }, {
    name: "hour",
    align: "center",
    label: "Horas",
    field: "hour",
    sortable: true,
  }, {
    name: "docAlternative",
    align: "center",
    label: "Documento Alternativo",
    field: "docAlternartive",
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
    label: "Documento Alternativo",
    field: "docAlternartive",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status"
  }
]);



</script>


<style></style>