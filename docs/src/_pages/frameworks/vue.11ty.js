export const data = {
  title: 'Vue',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'integrations/vue.html',
}

export function render() {
  return /* markdown */`
<div bp-layout="inline gap:xs">
  <bp-tag style="--padding: var(--bp-size-200) var(--bp-size-600)"><a href="https://stackblitz.com/edit/blueprintui-vue" target="_blank" rel="noopener noreferrer">Demo</a> <img src="/assets/images/frameworks/vue.svg" alt="Vue" style="max-width: 15px" /></bp-tag>
</div>

To use BlueprintUI in Vue be sure to follow the [getting started guide](/getting-started.html) and installation.
Once installed in your Vue app instantiation adjust the compiler options to enable BlueprintUI components.

\`\`\`javascript
const { createApp } = require('vue');
import App from "./App.vue";

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('bp-');
app.mount("#app");
\`\`\`


Once enabled components can be imported into Vue SFC files.

\`\`\`html
<!-- app.vue -->
<template>
  <div bp-layout="block gap:md">
    <bp-button @click="showAlert = !showAlert">hello there</bp-button>
    <bp-alert-group status="success" :hidden="!showAlert">
      <bp-alert closable @close="showAlert = false">General Kenobi...</bp-alert>
    </bp-alert-group>
  </div>
</template>

<script>
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';

export default {
  name: 'App',
  data: () => ({
    showAlert: false
  }),
}
</script>
\`\`\`
  `;
}
