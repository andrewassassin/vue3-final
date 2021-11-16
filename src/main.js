import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.css'

import PrimeVue from 'primevue/config';

import 'primeflex/primeflex.css';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ProgressBar from 'primevue/progressbar';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

const app = createApp(App);
app.use(router)
app.use(store)
app.use(VueAxios,axios)
app.use(PrimeVue);
app.component('ProgressBar', ProgressBar);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.mount('#app');

