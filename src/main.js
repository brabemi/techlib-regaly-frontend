// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from '@/App'
import router from '@/router'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSimpleBreakpoints from 'vue-simple-breakpoints'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(BootstrapVue)
Vue.use(VueSimpleBreakpoints)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
