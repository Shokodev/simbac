<template>
  <v-app>
    <Toolbar />
    <router-view />
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import { mapActions } from 'vuex'

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
  mounted(){
    this.READ_ESTORE();
    window.ipc.on("CONSOLE_MSG", (msg) => {
        this.CONSOLE_MSG(msg);
    });
  },
  methods:{
    ...mapActions(["READ_ESTORE","CONSOLE_MSG"])
  }

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

</style>