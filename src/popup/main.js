import Vue from 'vue'
import Toasted from 'vue-toasted';
import App from './App.vue'

Vue.use(Toasted)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
