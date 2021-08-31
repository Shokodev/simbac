<template>
  <v-row>
    <v-col cols="12">
      <base-card color="primary" icon="mdi-application">
        <template #title>
          BACnet console
        </template>
        <v-card-title>
          <div class="d-flex justifiy-space-between flex-wrap">
            <v-checkbox
              v-model="level"
              value="error"
              label="Error"
              color="red"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="warn"
              label="Warning"
              color="orange lighten-2"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="info"
              label="Info"
              color="info"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="debug"
              label="Debug"
              color="indigo"
            >
            </v-checkbox>
          </div>
          <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="console"
          multi-sort
          class="elevation-1"
          id="consoleTable"
          dense
          disable-pagination
          hide-default-footer
          height="500px"
          fixed-header
        >
          <template v-slot:item.level="{ item }">
            <v-chip
              width="50px"
              class="ma-1"
              outlined
              small
              :color="getColor('.blablabla')"
            >
              {{ item.level }}
            </v-chip>
          </template>
        </v-data-table>
      </base-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  metaInfo: {
    title: "Console Table",
  },
  data() {
    return {
      search: "",
      level: [],
      headers: [
        {
          text: "Level",
          align: "start",
          value: "level",
          filter: (value) => {
            if (!this.level.length > 0) return true;
            return this.level.includes(value);
          },
        },
        {
          text: "Timestamp",
          value: "timestamp",
        },
        {
          text: "Message",
          value: "message",
        },
      ],
    };
  },
  methods: {
    getColor(level) {
      const colors = {
        error: "red",
        warn: "orange lighten-2",
        info: "info",
        debug: "indigo",
      };
      return colors[level];
    },
  },
  computed: {
    console: function() {
      return this.GET_CONSOLE_MSG;
    },

    ...mapGetters(["GET_CONSOLE_MSG"]),
  },
};

// color terminal #28292D
</script>

<style lang="sass"></style>
