<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-card>
        <v-container>
          <h2>Partner Search</h2>
          <p>Search For your Partner by Email</p>
          <v-row>
            <v-form ref="form" v-model="form">
              <v-col class="d-inline-flex">
                <v-text-field
                  v-model="email"
                  :rules="[rules.email]"
                  filled
                  label="Email Address"
                  type="email"
                ></v-text-field>
                <v-btn
                  @click="searchUserByEmail"
                  class="ml-2 mt-2"
                  :disabled="!form"
                  large
                  color="primary"
                  >Search</v-btn
                >
              </v-col>
            </v-form>
          </v-row>
          <v-row v-if="foundUser">
            <v-col class="d-inline-flex">
              <v-card>
                <v-card-text>
                  <div>
                    {{ foundUser.email }}
                  </div>
                  <p class="display-1 text-primary">
                    {{ foundUser.name }}
                  </p>
                  <div class="text-primary">
                    To add this user as a partner,please use the add button below.
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="AddUserAsPartner(foundUser.id)"
                    >Add</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="message">
            <v-col> 
                <h3>{{message}}</h3>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-snackbar
        :timeout="3000"
        :value="showToast"
        absolute
        bottom
        right
        :color="toastColor"
      >{{toastMessage}}</v-snackbar>
    </v-container>
  </div>
</template>
<script>
import { db } from "../main";

export default {
  name: "addPartner",
  data() {
    return {
      form: false,
      isLoading: false,
      showToast: false,
      toastColor: "",
      toastMessage: "",
      email: "",
      foundUser: null,
      message: "",
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid Email.",
      },
    };
  },
  methods: {
    async searchUserByEmail() {
      this.isLoading = true;
      this.message = "";
      this.foundUser = null;
      const snapshot = await db
        .collection("users")
        .where("email", "==", this.email.toLowerCase())
        .get();
      if (!snapshot.empty) {
        const userId = snapshot.docs[0].id;
        const userData = snapshot.docs[0].data();
        this.foundUser = {
          id: userId,
          ...userData,
        };
      } else {
        this.message = "No user with that email found";
      }

      this.isLoading = false;
    },
    async AddUserAsPartner(id) {
        try {
        const authUserId=this.$store.state.user.id;
            
        await db.collection('users').doc(authUserId).update({partnerId:id});

          this.toastColor='success';
          this.toastMessage='Partner added succesfully';
          this.showToast=true;  
        } catch (error) {
            this.toastColor='red';
          this.toastMessage=error;
          this.showToast=true;  
        }

    },
  },
};
</script>