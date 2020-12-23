import '@babel/polyfill'
import 'mutationobserver-shim'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) => {
    //const store = router.app.$store;
    console.log('store ');
    console.log(store.getters.loggedInUser);
    if(to.matched.some(record => record.meta.privateRoute)) {
      if(store.getters.loggedInUser) {
        next();
        return;
      }
      next('/login');
    }else
      next();
  })
  

createApp(App).use(store).use(router).mount('#app')
