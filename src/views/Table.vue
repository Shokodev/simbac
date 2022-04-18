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
              value="ERROR"
              label="Error"
              color="red"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="WARN"
              label="Warning"
              color="orange lighten-2"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="INFO"
              label="Info"
              color="info"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="DEBUG"
              label="Debug"
              color="indigo"
              class="mr-2"
            >
            </v-checkbox>
            <v-checkbox
              v-model="level"
              value="TRACE"
              label="Trace"
              color="teal"
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
              :color="getColor(item.level)"
            >
              {{ item.level }}
            </v-chip>
            <!--TODO, create settings for Timestamp formatting -->
          </template>
                    <template v-slot:item.timestamp="{ item }">
            {{new Date(item.timestamp).toGMTString().replace('GMT','')}}
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
        ERROR: "red",
        WARN: "orange lighten-2",
        INFO: "info",
        DEBUG: "indigo",
        TRACE: "teal"
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
