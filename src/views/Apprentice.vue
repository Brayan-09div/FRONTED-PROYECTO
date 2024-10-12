<template>
  <Header title="Aprendices"></Header>
  <div style="display: flex; justify-content: center; padding: 10px">
    <CustomTable
      :rows="rows"
      :columns="columns"
      :title="title"
      :onClickEdit="openDialog"
      :toggleActivate="changestatus"
    >
  </CustomTable>

  </div>
</template>

<script setup>
import CustomTable from "../components/tables/Tables.vue"
import { onBeforeMount, ref } from "vue";
import Header from '../components/header/Header.vue';
import { getData } from '../services/ApiClient.js';

let title = ref("Aprendices")
let alert = ref(false)
const rows = ref([]);


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
    name: "firstName",
    label: "Nombre",
    field: "firstName",
    align: "center",
    sortable: true,
  },
  {
    name: "lastName",
    label: "Apellido",
    align: "center",
    field: "lastName",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "N° Documento",
    field: "numDocument",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Correo",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "Telefono",
    field: "phone",
    sortable: true,
  },
]);



function openDialog(row){
  alert.value=true
  console.log(row);
}

function changestatus(row){
  row.estado = row.estado === 1 ? 0 : 1; 
}

</script>