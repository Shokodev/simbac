<template>
  <v-container>
    <h1 class="ma-2">Dashboard</h1>
    <v-card class="ma-2 secondary">
      <v-card-title>
        Console
      </v-card-title>
      <div class="ma-2 rounded-lg">
        <div class="text-left" v-for="(txt,i) in GET_CONSOLE_MSG" :key="i">{{txt.timestamp}} {{txt.level.toUpperCase()}} {{txt.message}}</div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
    name: 'Dashboard',
    components: {
    },
    methods:{

    },
    computed: {
      console: function() {
        return this.GET_CONSOLE_MSG;
      },

    ...mapGetters(["GET_CONSOLE_MSG"]),
  },
  }
</script>
