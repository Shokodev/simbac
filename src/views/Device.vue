<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="blabla">
        <base-card v-if="eStore" color="primary" icon="mdi-protocol">
          <template #title>
            BACnet STACK
          </template>
          <template #subtitle>
            <div class="text-caption">
              {{ eStore.name }}
            </div>
          </template>
          <v-card-text>
            <div>Port: {{ eStore.port }}</div>
            <div>Device ID: {{ eStore.deviceId }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="start" :color="running ? 'green' : ''">Run</v-btn>
            <v-btn @click="stop" :color="!running ? 'red' : ''">Stop</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="deviceSettings = true" v-if="!running"
              >Settings</v-btn
            >
          </v-card-actions>
        </base-card>
      </v-col>
      <v-col cols="12" md="6">
        <base-card color="primary" icon="mdi-lan">
          <template #title>
            BACnet Device / Interface
          </template>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            possimus voluptatum, tempore voluptatem accusantium libero! Soluta
            eum quas voluptas, quasi quis minus odit tempora vitae perspiciatis
            ullam illum nostrum ipsam.
          </v-card-text>
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
    <device-settings
      v-if="deviceSettings"
      :showDialog="deviceSettings"
      :device="eStore"
      @save="deviceSettingsEvent($event)"
    />
    <add-datapoint
      v-if="addDatapoint"
      :showDialog="addDatapoint"
      @close="addDatapoint = false"
    />
  </v-container>
</template>

<script>
import DeviceSettings from "@/components/DeviceSettings.vue";
import { mapActions, mapGetters } from "vuex";
import DatapointTree from "@/components/DatapointTree.vue";
import AddDatapoint from "@/components/AddDatapoint.vue";

export default {
  name: "Device",
  components: {
    DeviceSettings,
    DatapointTree,
    AddDatapoint,
  },
  data: () => ({
    alert: false,
    errorText: "",
    eStore: null,
    deviceSettings: false,
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
    deviceSettingsEvent(eStore) {
      this.deviceSettings = false;
      if(eStore) this.SET_ESTORE(eStore);
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
