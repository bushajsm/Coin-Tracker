import Vue from "vue";
import App from "./App.vue";
import vSelect from 'vue-select'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'vue-select/dist/vue-select.css';
import store from "./store";
import './assets/style.css';
Vue.config.productionTip = false;
Vue.component('v-select', vSelect)
new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");