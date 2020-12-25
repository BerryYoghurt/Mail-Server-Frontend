import { createRouter, createWebHistory } from 'vue-router'
import ViewMailNew from '../views/ViewMailNew.vue';


const routes = [
  {
    path: '/',
    component: ()=> import('../views/Home.vue')
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
    meta: {
      privateRoute: true
    },
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/compose',
    name: 'EditMail',
    props: true,
    meta: {
      privateRoute: true
    },
    component: () => import('../views/EditMailNew.vue')
  },
  {
    path: '/email',
    name: 'EmailViewNew',
    meta: {
      privateRoute: true
    },
    component: ViewMailNew,
    props: true
  },
  {
    path:'/user/',
    name:'ViewProfile',
    meta: {
      privateRoute: true
    },
    children:[
      {
        path:'contacts',
        name:'UserContacts',
        props:true,
        component:() => import('../components/UserContacts')
      },
      {
        path:'folders',
        name:'UserFolders',
        props:true,
        component:() => import('../components/UserFolders')
      }
    ],
    component: () => import('../views/ViewProfile')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
