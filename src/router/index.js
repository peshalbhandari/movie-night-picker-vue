import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup'
import Signin from '../views/Signin'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter:guard
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: Signup
  },
  {
    path: '/',
    name: 'Sign In',
    component: Signin
  },
  {
    path: '/addpartner',
    name: 'Add Partner',
    component: () => import(/* webpackChunkName: "addpartner" */ '../views/AddPartner.vue'),
    beforeEnter:guard
  }
]

function guard(to,from,next){
  if(store.state.user.id){
    next();
  }
  else{
    next("/");
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
