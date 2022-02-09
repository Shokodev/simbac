<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="blabla">
        <base-card v-if="eStore" color="primary" icon="mdi-protocol">
          <template #title>
            BACnet STACK
          </template>
          <v-card-text>
            <div>Bacnet ID: {{ eStore.bacnetId }}</div>
            <div>Port: {{ eStore.port }}</div>
            <div>
              IP-Address:
              {{
                eStore.netInterface !== "127.0.0.1"
                  ? eStore.netInterface
                  : "Interface set to localhost"
              }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="start" :color="running ? 'green' : ''">Run</v-btn>
            <v-btn @click="stop" :color="!running ? 'red' : ''">Stop</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="bacstackSettings = true" v-if="!running"
              >Settings</v-btn
            >
          </v-card-actions>
        </base-card>
      </v-col>
      <v-col cols="12" md="6">
        <base-card color="primary" icon="mdi-lan">
          <template #title>
            BACnet Device
          </template>
          <v-card-text v-if="this.eStore">
            <div>Name: {{ getPropertyById(70) }}</div>
            <div>Firmware: {{ getPropertyById(44) }}</div>
            <div>Description: {{ getPropertyById(28) }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="deviceProperties = true">Edit</v-btn>
          </v-card-actions>
        </base-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <base-card color="primary" icon="mdi-export">
          <template #title>
            Datapoints
          </template>
          <template #subtitle class="text-right">
            <v-btn color="secondary" @click="addDatapoint = true"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <datapoint-tree />
        </base-card>
      </v-col>
    </v-row>

    <base-alert-box
      v-if="alert"
      :showDialog="alert"
      :text="errorText"
      type="error"
      @confirm="alertEvent($event)"
    />
    <bac-stack-settings
      v-if="bacstackSettings"
      :showDialog="bacstackSettings"
      :storedata="eStore"
      @save="bacstackSettingsEvent($event)"
    />
    <add-datapoint
      v-if="addDatapoint"
      :showDialog="addDatapoint"
      @close="addDatapoint = false"
    />
  </v-container>
</template>

<script>
import BacStackSettings from "@/components/BacStackSettings.vue";
import { mapActions, mapGetters } from "vuex";
import DatapointTree from "@/components/DatapointTree.vue";
import AddDatapoint from "@/components/AddDatapoint.vue";

export default {
  name: "Device",
  components: {
    DatapointTree,
    AddDatapoint,
    BacStackSettings,
  },
  data: () => ({
    alert: false,
    errorText: "",
    eStore: null,
    bacstackSettings: false,
    deviceProperties: false,
    addDatapoint: false,
    bacnetStackRunning: { state: true, color: "green" },
    bacnetStackStopped: { state: false, color: "red" },
  }),
  mounted() {
    window.ipc.on("START_STACK", (e) => {
      if (e !== "started") {
        this.errorText = e;
        this.alert = true;
      } else {
        this.READ_ESTORE();
        this.SET_IS_RUNNING(true);
      }
    });
    window.ipc.on("STOP_STACK", (e) => {
      if (e !== "stopped") {
        this.errorText = e;
        this.alert = true;
      } else {
        this.SET_IS_RUNNING(false);
      }
    });
    this.READ_ESTORE();
    this.eStore = this.GET_ESTORE;
  },
  methods: {
    start() {
      window.ipc.send("START_STACK", this.GET_ESTORE);
    },
    stop() {
      window.ipc.send("STOP_STACK", "STOP");
    },
    alertEvent() {
      this.alert = false;
      this.errorText = "";
    },
    bacstackSettingsEvent(eStore) {
      this.bacstackSettings = false;
      if (eStore) this.SET_ESTORE(eStore);
    },
    getPropertyById(id) {
      //TODO switch to computed val out of store
      let d = this.eStore.dp.find((d) => d.oid === "8:0");
      if (!d) return "No device yet";
      return (
        d.properties.find((p) => p.id === id).value || "Property not found"
      );
    },
    ...mapActions(["READ_ESTORE", "SET_IS_RUNNING", "SET_ESTORE"]),
  },
  computed: {
    running: function() {
      return this.GET_IS_RUNNING;
    },
    ...mapGetters(["GET_IS_RUNNING", "GET_ESTORE"]),
  },
};
</script>

<style lang="sass">
blabla
  padding: 12px
</style>
