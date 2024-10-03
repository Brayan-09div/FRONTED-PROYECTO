<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      flat
      bordered
      class="q-table-custom"
    >
      <template v-slot:body-cell-editar="props">
        <q-td :props="props" class="q-pa-xs text-center">
          <q-btn
            class="edit-btn"
            @click="onClickEdit(props.row)"
            color="primary"
            icon="edit"
            round
            size="md"
            aria-label="Edit"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-activar="props">
        <q-td :props="props" class="q-pa-xs text-center">
          <q-btn
            class="toggle-btn"
            @click="toggleActivate(props.row)"
            :icon="props.row.estado == 1 ? 'check' : 'close'"
            round
            size="md"
            aria-label="Toggle Activation"
            :color="props.row.estado == 1 ? 'positive' : 'negative'"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  onClickEdit: {
    type: Function,
    required: true
  },
  toggleActivate: {
    type: Function,
    required: true
  },
});
</script>

<style scoped>
.q-table-custom {
  border: 1px solid #000000; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

</style>
