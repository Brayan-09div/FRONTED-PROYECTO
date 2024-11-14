<template>
    <Header title="Fichas"></Header>
    <ficheTable :rows="rows" :props="props" :columns="columns" props="props" :toggleSeeApprentice="seeApprentices"></ficheTable>
</template>

<script setup>
import { ref, onBeforeMount} from 'vue';
import Header from '../components/header/header.vue';
import ficheTable from '../components/tables/tableFiche.vue';
import { router } from '../router/routers';
import { getData } from '../services/ApiClient';



onBeforeMount(() =>{
    loadDataFiches();
})

async function loadDataFiches() {
        const response = await getData('/repfora/fiches');
        rows.value = response
    }
const rows = ref([]);

const columns = ref([
    {
        name: 'Num',
        label: 'N°',
        field: 'Num',
        align: 'center',
        sortable: true,
    },
    {
        name: 'name',
        label: 'NOMBRE FICHA',
        field: row => row.program.name,
        align: 'center',
        sortable: true,
    },
    {
        name: 'code',
        label: 'COD.FICHA',
        field: row => row.program.code,
        align: 'center',
        sortable: true,
    },
    {
        name: 'status',
        label: 'ESTADO',
        field: 'status',
        align: 'center',
        sortable: true,
    },
    {
        name: 'seeApprentice',
        label: 'VER APRENDICES',
        field: 'actions',
        align: 'seeApprentice',
        sortable: true,
    }])


    
async function seeApprentices(row) {
  
    router.push({
    path: '/layouts/apprentices',
    query: { ficheId: row._id } 
  });
    

}

</script>