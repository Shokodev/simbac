<template>
  <v-container>
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
