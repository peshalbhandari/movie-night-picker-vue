<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-overlay :value="isLoading">
            <v-progress-circular color="primary" indeterminate  size="64"></v-progress-circular>
        </v-overlay>
    <v-form ref="form" v-model="form" class="pa-4 mt-6">
      <v-text-field v-model="email" label="Email" filled :rules="[rules.required]"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        filled
        label="Password"
        :rules="[rules.required]"
      ></v-text-field>
    </v-form>
    <v-alert  v-if="errorMsg" color="red" border="top" class="ml-5 mr-5" close-icon>{{errorMsg}}</v-alert>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!form" depressed color="primary" @click="SignInWithEmailAndPassword">Sign In</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from 'firebase';
import {db} from '../main'
export default {
  name: "signin",
  data() {
    return {
      isLoading: false,
      form: false,
      email: "",
      password: "",
      errorMsg:'',
      rules:{
          required:(v)=>!!v||'This is a required field'
      }
    };
  },
  methods: {
    async  SignInWithEmailAndPassword(){
          this.isLoading=true;
          try {
              const authRes=await firebase.auth().signInWithEmailAndPassword(this.email.toLowerCase(),this.password);
              const dbUser=await db.collection('users').doc(authRes.user.uid).get();
              const userData=dbUser.data();
              this.$store.dispatch('user/setUserData',{
                  id:dbUser.id,
                  name:userData.name,
                  email:userData.email,
                  partnerId:userData.partnerId||''

              });
              this.$router.replace({name:'Home'});
          } catch (error) {
              this.errorMsg='An unexpected error has occured';
              if(error.message){
                  this.errorMsg=error.message;
              }
          }
          this.isLoading=false;
      }
  },
};
</script>