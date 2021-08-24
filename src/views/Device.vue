<template>
  <v-container>
    <base-card v-if="device" color="primary" full-header>
      <template #heading>
        <div class="pa-8 white--text">
          <div class="text-h4 font-weight-light">
            BACnet Device
          </div>
          <div class="text-caption">
            {{ device.name }}
          </div>
        </div>
      </template>
      <v-card-text>
        <div>Port: {{ device.port }}</div>
        <div>Device ID: {{ device.deviceId }}</div>
      </v-card-text>
            <v-card-actions>
        <v-btn @click="start" :color="running ? 'green' : ''">Run</v-btn>
        <v-btn @click="stop" :color="!running ? 'red' : ''">Stop</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="deviceSettings = true" v-if="!running"
          >Device Settings</v-btn
        >
      </v-card-actions>
    </base-card>

      

    <AlertBox
      v-if="alert"
      :showDialog="alert"
      :text="errorText"
      type="error"
      @confirm="alertEvent($event)"
    />
    <DeviceSettings
      v-if="deviceSettings"
      :showDialog="deviceSettings"
      :device="device"
      @save="deviceSettingsEvent($event)"
    />
  </v-container>
</template>

<script>
import BaseCard from "@/components/BaseCard";
import AlertBox from "@/components/AlertBox.vue";
import DeviceSettings from "@/components/DeviceSettings.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Device",
  components: {
    AlertBox,
    DeviceSettings,
    BaseCard,
  },
  data: () => ({
    alert: false,
    errorText: "",
    device: null,
    deviceSettings: false,
    bacnetStackRunning: { state: true, color: "green" },
    bacnetStackStopped: { state: false, color: "red" },
  }),
  mounted() {
    window.ipc.on("CREATE_DEVICE", (e) => {
      if (e !== "started") {
        this.errorText = e;
        this.alert = true;
      } else {
        this.READ_ESTORE();
        this.SET_IS_RUNNING(true);
      }
    });
    window.ipc.on("DELETE_DEVICE", (e) => {
      if (e !== "stopped") {
        this.errorText = e;
        this.alert = true;
      } else {
        this.SET_IS_RUNNING(false);
      }
    });
    this.READ_ESTORE();
    this.device = this.$store.state.device;
  },
  methods: {
    start() {
      window.ipc.send("CREATE_DEVICE", this.device);
    },
    stop() {
      window.ipc.send("DELETE_DEVICE", "STOP");
    },
    alertEvent() {
      this.alert = false;
      this.errorText = "";
    },
    deviceSettingsEvent(d) {
      this.deviceSettings = false;
      if (d) this.device = d;
    },
    ...mapActions(["READ_ESTORE", "SET_IS_RUNNING"]),
  },
  computed: {
    running: function() {
      return this.GET_IS_RUNNING;
    },

    ...mapGetters(["GET_IS_RUNNING"]),
  },
};
</script>
