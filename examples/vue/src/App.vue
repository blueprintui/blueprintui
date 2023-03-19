<script lang="ts">
export default {
  name: 'App',
  data: () => ({
    showAlert: true
  }),
}
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
