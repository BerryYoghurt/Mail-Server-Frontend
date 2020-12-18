import '@babel/polyfill'
import 'mutationobserver-shim'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(store).use(router).mount('#app')
