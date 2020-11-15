<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="showNav = !showNav"></v-app-bar-nav-icon>
      <v-toolbar-title>Movie Night Picker</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn text v-if="userId" to="/addpartner">Add Partner</v-btn>
    </v-app-bar>
    <v-navigation-drawer fixed v-model="enableNav" app>
      <v-list>
        <v-list-item>
          <v-list-item-title>Home</v-list-item-title>
          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
         <v-list-item>
          <v-list-item-title>About</v-list-item-title>
          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
         <v-list-item>
          <v-list-item-title>Test 1</v-list-item-title>
          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
         <v-list-item>
          <v-list-item-title>Test 2</v-list-item-title>
          <v-list-item-action>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <v-spacer>
      </v-spacer>
      Hello Peshal
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data(){
    return{
      showNav:true
    }
  },
  computed:{
    enableNav:{
      get(){
        return this.showNav;
      },
      set(val){
        this.showNav=val;
      }
    },
    userId(){
      return this.$store.state.user.id;
    }
  }
};
</script>

