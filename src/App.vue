<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  mounted() {
    this.$vuetify.theme.dark = true;
    this.READ_ESTORE();
    window.ipc.on("CONSOLE_MSG", (msg) => {
      this.CONSOLE_MSG(msg);
    });
  },
  methods: {
    ...mapActions(["READ_ESTORE", "CONSOLE_MSG"]),
  },
};
</script>

<style lang="scss">

</style>
