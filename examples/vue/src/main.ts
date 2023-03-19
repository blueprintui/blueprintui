import { createApp } from 'vue'
import '@blueprintui/components/include/alert.js';
import '@blueprintui/components/include/button.js';

import App from './App.vue'
import './assets/main.css'

const app = createApp(App)
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
app.mount("#app")
