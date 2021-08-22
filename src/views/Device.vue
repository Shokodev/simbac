<template>
  <v-container>
    <v-card v-if="device" class="text-left">
      <v-card-title>{{ device.name }}</v-card-title>
      <v-card-text>
        <div>Port: {{ device.port }}</div>
        <div>Device ID: {{ device.deviceId }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="start" :color="isStarted ? 'green' : ''">Run</v-btn>
        <v-btn @click="stop" :color="isStarted ? '' : 'red'">Stop</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="deviceSettings = true" v-if="!isStarted"
          >Device Settings</v-btn
        >
      </v-card-actions>
      <div>{{device.dp}}</div>
    </v-card>
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
import AlertBox from "@/components/AlertBox.vue";
import DeviceSettings from "@/components/DeviceSettings.vue";
import { mapActions } from 'vuex'

export default {
  name: "Device",
  components: {
    AlertBox,
    DeviceSettings,
  },
  data: () => ({
    alert: false,
    errorText: "",
    isStarted: false,
    device: null,
    deviceSettings: false,
  }),
  mounted() {
    window.ipc.on("CREATE_DEVICE", (e) => {
      if (e !== "started") {
        this.errorText = e;
        this.alert = true;
      } else {
        this.READ_ESTORE();
        this.isStarted = true;
      }
    });
    window.ipc.on("DELETE_DEVICE", (e) => {
      if (e !== "stopped") {
        this.errorText = e;
        this.alert = true;
      } else {
        this.isStarted = false;
      }
    });
    this.READ_ESTORE();
    this.device = this.$store.state.device
    this.isStarted = this.$store.state.device.isRunning || false
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
    ...mapActions(['READ_ESTORE'])
  },
};
</script>
