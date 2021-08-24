<template>
  <div>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-icon :color="running.color" v-if="this.$store.state.device">{{running.icon}}</v-icon>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      class="primary"
      absolute
      temporary
      :mini-variant="mini"
    >
      <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          :to="to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "toolbar",
  data: () => ({
    links: [
      ["mdi-gauge", "Dashboard", "/dashboard"],
      ["mdi-chip", "Device", "/device"],
      ["mdi-gamepad-square-outline", "Simulate", "/simulate"],
      ["mdi-cog", "Settings", "/settings"],
      ["mdi-iframe-braces-outline", "About", "/about"],
    ],
    bacnetStackRunning: {icon: 'mdi-square', color: 'green'},
    bacnetStackStopped: {icon: 'mdi-circle', color: 'red' },
    mini: true,
    drawer: false,
  }),

  computed: {
    running: function (){
      return this.GET_IS_RUNNING ? this.bacnetStackRunning : this.bacnetStackStopped
    },
    ...mapGetters(['GET_IS_RUNNING'])
  }
};
</script>

<style>
.v-list {
  padding: 0 !important;
}
</style>
