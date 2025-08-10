<script setup lang="ts">
  import { ref } from 'vue';
  import '@blueprintui/components/include/alert.js';
  import '@blueprintui/components/include/button.js';

  const showAlert = ref(false);
  const toggle = () => { showAlert.value = !showAlert.value }
</script>

<template>
  <div bp-layout="block gap:md">
    <bp-button @click="showAlert = !showAlert">hello there</bp-button>
    <bp-alert-group status="success" :hidden="!showAlert">
      <bp-alert closable @close="showAlert = false">General Kenobi...</bp-alert>
    </bp-alert-group>
  </div>
</template>

<style scoped>

</style>
