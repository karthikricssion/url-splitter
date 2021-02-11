import Vue from 'vue'
import Toasted from 'vue-toasted';
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(Toasted)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
