import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
const pinia = createPinia();

import 'tippy.js/dist/tippy.css';
import '@/style.scss';
import './assets/style.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#root-app');
