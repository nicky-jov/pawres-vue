import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://floating-wave-43517.herokuapp.com/api' //hosted api
Vue.prototype.$public = 'https://floating-wave-43517.herokuapp.com' //hosted html

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
