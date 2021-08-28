<template>
  <div>
    <v-app-bar :dark="$vuetify.theme.dark" app flat>
      <v-app-bar-nav-icon @click="toggleSidebarDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-icon :color="running.color" v-if="this.$store.state.device">{{
        running.icon
      }}</v-icon>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppBar",
  data: () => ({
    bacnetStackRunning: { icon: "mdi-square", color: "green" },
    bacnetStackStopped: { icon: "mdi-circle", color: "red" },
    mini: true,
    drawer: false,
  }),
  methods: {
    ...mapActions(["SET_STYLE_DRAWER", "SET_STYLE_MINI"]),

    toggleSidebarDrawer() {
      this.SET_STYLE_DRAWER();
    },
  },

  computed: {
    running: function() {
      return this.GET_IS_RUNNING
        ? this.bacnetStackRunning
        : this.bacnetStackStopped;
    },
    ...mapGetters(["GET_IS_RUNNING"]),
  },
};
</script>
