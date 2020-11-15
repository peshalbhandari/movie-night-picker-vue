<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-form ref="form" v-model="form" class="pa-4 mt-6">
      <v-text-field
        v-model="name"
        label="UserName"
        :rules="[rules.required]"
        filled
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        :rules="[rules.email]"
        filled
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        counter="6"
        style="min-height: 96px"
        filled
      ></v-text-field>
    </v-form>
    <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5">{{
      errorMsg
    }}</v-alert>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        color="primary"
        :loading="isLoading"
        depressed
        @click="signUpWithEmailAndPassword"
        >Sign Up</v-btn
      >
    </v-card-actions>
  </v-card>
</template>



<script>

import firebase from 'firebase';
import {db} from '../main';

export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMsg: "",
      isLoading: false,
      form: true,
      rules:{
          email:v=>!!(v||'').match(/@/)|| "Please enter a valid Email.",
          required:v=>!!v||"This is a required field"
      }
    }
  },
  methods: {
   async signUpWithEmailAndPassword() {
        this.isLoading=true;
        try {
            let authRes= await firebase.auth().createUserWithEmailAndPassword(this.email.toLowerCase(),this.password);
            await db.collection('users')
            .doc(authRes.user.uid)
            .set({name:this.name,email:this.email});

            this.$store.dispatch('user/setUserData',{
                id:authRes.user.uid,
                email:this.email,
                name:this.name,
                partnerId:''
            });

            this.$router.replace({name:'Home'});
        } catch (error) {
            this.errorMsg='An unexpected error has occured';
            if(error.message){
                this.errorMsg=error.message;
            }
        }
        this.isLoading=false;
    },
  },
};
</script>