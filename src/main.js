import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vant from '../untils/vant-config'


Vue.use(vant);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
