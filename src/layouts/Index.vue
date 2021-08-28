<template>
  <v-app>
    <side-bar> </side-bar>
    <app-bar> </app-bar>
    <base-view />
  </v-app>
</template>

<script>
export default {
  components: {
    BaseView: () => import("./View"),
    SideBar: () => import("./Sidebar"),
    AppBar: () => import("./AppBar"),
  },
};
</script>
