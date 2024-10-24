<template>
  <Header title="Aprendices"></Header>
  <ModalDialog nameButton="Agregar" title="Agregar Aprendiz" labelClose="Cerrar" labelSend="Enviar"
    :onclickClose="handleClose" :onclickSend="handleSend">
    <q-input v-model="firstName" label="Nombre" filled /> <br>
    <q-input v-model="lastName" label="Apellido" filled /> <br>
    <q-input v-model="email" label="Email" filled /> <br>
    <q-input v-model="phone" label="Telefono" filled /> <br>
    <q-select square filled v-model="tpDocument" :options="options" label="Tipo de Documento" /><br>
    <q-input v-model="numDocument" label="N° Documento" filled /> <br>
    <!-- <q-select square filled v-model="fiche" :optionsFiche="options" label="N° Documento" /><br> -->
    <q-select dense v-model="fiche" :options="filterOptions" label="Ficha" emit-value map-options
              option-label="fiche" option-value="_id" use-input @filter="filterFunction" class="custom-select"
              use-chips></q-select>
  </ModalDialog>
  <div style="display: flex; justify-content: center; padding: 10px">
    <CustomTable :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialog"
      :toggleActivate="changestatus">
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
import { getData, postData, putData } from '../services/ApiClient.js';
import ModalDialog from '../components/modal/modal.vue';



// let title = ref("Aprendices")
let alert = ref(false)
const rows = ref([]);
// variables del aprendiz
let firstName = ref('')
let lastName = ref('')
let email = ref('')
let phone = ref('')
let tpDocument = ref('')
let numDocument = ref('')
let fiche = ref('')

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