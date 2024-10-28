<template>
    <Header title="Fichas"></Header>
    <ficheTable :rows="rows" :columns="columns" props="props" :toggleSeeApprentice="seeApprentices"></ficheTable>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/header/header.vue';
import ficheTable from '../components/tables/tableFiche.vue';
import { router } from '../router/routers';

const rows = ref([
    {
        name: 'ADO',
        program: '2711689',
        status: 1,
    },
    {
        name: 'GESTION DE MERCADOS',
        program: '2811689',
        status: 0,
    }
]);

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
        field: 'name',
        align: 'center',
        sortable: true,
    },
    {
        name: 'codigo',
        label: 'COD.FICHA',
        field: 'program',
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

async function seeApprentices() {
    router.push('/informationFicheApprentice')
}

</script>