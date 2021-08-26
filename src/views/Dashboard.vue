<template>
  <v-container>
    <h1 class="ma-2">SIMBAC</h1>
      <console-table></console-table>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import consoleTable  from "@/views/Table"
  export default {
    name: 'Dashboard',
    components: {
      consoleTable
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
