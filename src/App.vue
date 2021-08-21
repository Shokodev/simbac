<template>
  <v-app>
    <Toolbar />
    <router-view />
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
export default {
  components: {Toolbar},
  data: () => ({
    links: [
      ["mdi-gauge", "Dashboard", "/dashboard"],
      ["mdi-chip", "Device", "/device"],
      ["mdi-gamepad-square-outline", "Simulate", "/simulate"],
      ["mdi-cog", "Settings", "/settings"],
      ["mdi-iframe-braces-outline", "About", "/about"],
    ],
    mini: true,
    drawer: false,
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar {
display: none;
}

</style>