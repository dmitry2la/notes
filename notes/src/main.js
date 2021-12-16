import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import Loader from './components/AppLoader'
import './main.scss'

import { initializeApp } from 'firebase/app'

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)

initializeApp({
  apiKey: 'AIzaSyDzClLi_VglLW3_vkEpOxrU2wK7IwOYtkw',
  authDomain: 'vue-notes-13e3c.firebaseapp.com',
  projectId: 'vue-notes-13e3c',
  storageBucket: 'vue-notes-13e3c.appspot.com',
  messagingSenderId: '291657722233',
  appId: '1:291657722233:web:d9a6730c1639fb3cdc27a8',
  databaseURL: 'https://vue-notes-13e3c-default-rtdb.europe-west1.firebasedatabase.app/'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
