import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import 'bootstrap/dist/js/bootstrap.min'
// import 'bootstrap/dist/css/bootstrap.css'

import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ProgressBar from 'primevue/progressbar';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ScrollPanel from "primevue/scrollpanel";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Badge from 'primevue/badge';
import TieredMenu from 'primevue/tieredmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const app = createApp(App);
app.use(router)
app.use(store)
app.use(VueAxios,axios)
app.use(PrimeVue);
app.use(ToastService)
app.component('ProgressBar', ProgressBar);
app.component('ScrollPanel', ScrollPanel);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Badge', Badge);
app.component('TieredMenu', TieredMenu);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.mount('#app');

