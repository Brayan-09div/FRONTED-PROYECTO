<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    @mouseenter="miniState = false"
    @mouseleave="miniState = true"
    :width="200"
    :breakpoint="500"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 1 }">
      <q-list padding>
        <q-item clickable to="/index/home" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section> Inicio </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/instructor" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> Instructor </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/apprentice" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section> Aprendices </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/assignment" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section> Asignaciones </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/followup" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="assignment_ind" />
          </q-item-section>
          <q-item-section> Seguimientos </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/binnacles" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="note" />
          </q-item-section>
          <q-item-section> Bitacoras </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable to="/register" v-ripple class="menu-button custom-menu-item">
          <q-item-section avatar>
            <q-icon name="Library Books" />
          </q-item-section>
          <q-item-section> Registro </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false);
const miniState = ref(true);
</script>
