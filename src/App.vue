<template>
  <v-app>
    <v-toolbar app flat class="white" light clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(item, index) in items" :key="index" flat :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          <span class="text-capitalize">{{item.title}}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer clipped class="grey lighten-4" light v-model="drawer" app>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="text-capitalize">{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-btn>contante</v-btn> -->
    <v-content>
      <v-divider></v-divider>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "view meetups", icon: "person", link: "/meetups" },
        { title: "oganize meetups", icon: "person", link: "/oganize" },
        { title: "profile", icon: "person", link: "/signup" },
        { title: "signup", icon: "person", link: "/signup" },
        { title: "signin", icon: "person", link: "/signin" },
        { title: "logout", icon: "person", link: "/logout" }
      ],
      drawer: false
    };
  },
  name: "App",
  components: {}
};
</script>
