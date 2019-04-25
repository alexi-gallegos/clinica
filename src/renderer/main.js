import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser,faEye,faUserTie,faUserMd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from 'vue-notification'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import Paginate from 'vuejs-paginate'


library.add(faUser,faEye,faUserTie,faUserMd,faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('pulse-loader', PulseLoader)
Vue.component('clip-loader',ClipLoader)
Vue.component('paginate', Paginate)
Vue.use(Notifications)


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))


axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer '+store.getters.token;
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === 401 && store.getters.token != null) {
      console.log('unauthorized, logging out ...');
      
      store.dispatch('logout');
      router.replace('/');
  }
  return Promise.reject(error.response);
});
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false





/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
