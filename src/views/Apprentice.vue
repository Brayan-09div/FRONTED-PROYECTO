<template>
  <Header title="Aprendices"></Header>
  <ModalDialog
      nameButton="Agregar"
      title="Título del Modal"
      labelClose="Cerrar"
      labelSend="Enviar"
      :onclickClose="handleClose"
      :onclickSend="handleSend"
    >
  </ModalDialog>
  <div style="display: flex; justify-content: center; padding: 10px">
    <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialog"
      :toggleActivate="changestatus">

    <!-- <q-input v-model="nombre" label="Nombre" filled /> <br>
    <q-input v-model="apellido" label="Apellido" filled /> <br>
    <q-input v-model="email" label="Email" filled /> <br>
    <q-input v-model="celular" label="Email" filled /> <br>
    <q-input v-model="email" label="Email" filled /> <br>
    <q-input v-model="email" label="Email" filled /> <br>
    <q-input v-model="email" label="Email" filled /> <br> -->
    </CustomTable>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet
          porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
          labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script setup>
import CustomTable from "../components/tables/tables.vue"
import { onBeforeMount, ref } from "vue";
// import Header from '../components/header/Header.vue';
import Header from "../components/header/header.vue";
import { getData, putData } from '../services/ApiClient.js';
import ModalDialog from '../components/modal/modal.vue';


// let title = ref("Aprendices")
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
  {
    name: "status",
    label: "Estado",
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



function openDialog(row) {
  alert.value = true
  console.log(row);
}

async function changestatus(row) {
  if (row.status === 1) {
    await putData(`/apprendice/disableapprentice/${row._id}`);
  } else {
    await putData(`/apprendice/enableapprentice/${row._id}`);
  }
  row.status = row.status === 1 ? 0 : 1;
}

</script>