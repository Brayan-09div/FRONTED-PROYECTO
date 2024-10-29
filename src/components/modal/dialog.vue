<template>
  <q-dialog v-model="computedModelValue" transition-show="rotate" transition-hide="rotate" persistent>
    <q-card>
      <q-card-section class="title">
        <div class="text-h6 text-center">{{ title }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <slot></slot>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat icon="save_as" :label="labelSend"  @clicK="onclickSend" color="white" style="background-color: #2f7d32;" v-close-popup />
        <q-btn flat icon="cancel" :label="labelClose" @clicK="onclicClose" color="red-8" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Título'
  },
  labelClose: {
    type: String,
    required: true,
    default: 'Cerrar'
  },
  labelSend: {
    type: String,
    required: true,
    default: 'Enviar'
  },
  onclickSend: {
    type: Function,
    required: true
  }
});


// Definir el evento que emitirá el valor del dialog
const emit = defineEmits(['update:modelValue']);

// Definir el computed que controlará el valor del dialog
const computedModelValue = computed({
  // va a retornar el valor del dialog
  get() {
    return props.modelValue;
  },
  // va a emitir el valor del dialog permitiendo abrir y cerrar el dialog
  set(value) {
    emit('update:modelValue', value);
  }
});

</script>

<style>
.title {
  background-color: #2f7d32;
  color: white;
}
.q-card {
  width: 400px;
}
</style>
