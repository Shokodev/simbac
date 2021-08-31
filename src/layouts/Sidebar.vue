<template>
  <v-navigation-drawer
    app
    v-model="GET_STYLE.sidebarDrawer"
    :expand-on-hover.sync="GET_STYLE.sidebarMini"
    :mini-variant="GET_STYLE.sidebarMini"
    :floating="true"
    :disable-resize-watcher="false"
    :mobile-breakpoint="600"
    dark
    :color="$vuetify.theme.dark ? 'dark' : '#242939'"
  >
    <v-list nav>
      <v-list-item class="px-0">
        <v-list-item-avatar>
          <v-img src="@/assets/ShokodevLogoSVG-NoTitle.svg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="text-uppercase">Simbac </v-list-item-title>
        <v-scroll-x-transition>
          <v-btn icon @click.stop="toggleMini">
            <v-tooltip v-if="!GET_STYLE.sidebarMini" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-icon dark v-bind="attrs" v-on="on" color
                  >mdi-circle-slice-8</v-icon
                >
              </template>
              <span>UnPin</span>
            </v-tooltip>
            <v-tooltip v-if="GET_STYLE.sidebarMini" right color="primary">
              <template v-slot:activator="{ on, attrs }">
                <v-icon dark v-bind="attrs" v-on="on" color=""
                  >mdi-circle-outline</v-icon
                >
              </template>
              <span>pin</span>
            </v-tooltip>
          </v-btn>
        </v-scroll-x-transition>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="px-2 text-center">
        <v-btn
          v-if="!$vuetify.theme.dark"
          @click="changeDarkMode(true)"
          class="mr-4 mb-4"
          color="dark"
          small
          fab
          dark
        >
          <v-icon>mdi-weather-night</v-icon>
        </v-btn>
        <v-btn
          v-else
          @click="changeDarkMode(false)"
          class="mr-4 mb-4"
          color="white"
          small
          fab
        >
          <v-icon color="warning">mdi-white-balance-sunny</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Sidebar",
  data: () => ({
    links: [
      ["mdi-gauge", "Dashboard", "/dashboard"],
      ["mdi-chip", "Device", "/device"],
      ["mdi-gamepad-square-outline", "Simulate", "/simulate"],
      ["mdi-cog", "Settings", "/settings"],
      ["mdi-iframe-braces-outline", "About", "/about"],
    ],
    drawer: true,
  }),
  computed: {
    ...mapGetters(["GET_STYLE"]),
  },

  methods: {
    ...mapActions(["SET_STYLE_MINI", "SET_STYLE_DRAWER"]),
    toggleMini() {
      this.SET_STYLE_MINI();
    },
    changeDarkMode(data) {
      this.$vuetify.theme.dark = data;
    },
  },
};
</script>
