import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false


Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios,axios)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Tambien importamos el archivo de rutas
import {routes} from './routes'


const router = new VueRouter({
  routes,
  linkActiveClass :'active'
})

new Vue({
  router,
  vuetify,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
