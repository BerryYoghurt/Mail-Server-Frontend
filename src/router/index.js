import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewMailNew from '../views/ViewMailNew.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/compose',
    name: 'EditMail',
    params: '',//TODO create a UUID for the email
    component: () => import('../views/EditMail.vue')
  },
  {
    path: '/mytest',
    name: 'MyTest',
    component: () => import('../views/mytest.vue')
  },
  {
    path: '/email',
    name: 'EmailViewNew',
    component: ViewMailNew,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
