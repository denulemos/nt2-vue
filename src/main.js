import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)

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
  render: h => h(App)
}).$mount('#app')
