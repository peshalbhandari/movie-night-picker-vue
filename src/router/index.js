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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
