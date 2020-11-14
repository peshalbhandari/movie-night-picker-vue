import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCJXoF03h7pFiO6NivAMF526xOdqtB_-OI",
  authDomain: "movie-night-picker-tut-7b7a3.firebaseapp.com",
  databaseURL: "https://movie-night-picker-tut-7b7a3.firebaseio.com",
  projectId: "movie-night-picker-tut-7b7a3",
  storageBucket: "movie-night-picker-tut-7b7a3.appspot.com",
  messagingSenderId: "753975021059",
  appId: "1:753975021059:web:0ec9a2b78b37ca04440836"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db=firebase.firestore();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
