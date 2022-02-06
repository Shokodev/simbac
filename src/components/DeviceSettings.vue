<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">Device Settings</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.name"
                label="Device Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                item-color="info"
                :items="BACnetPorts"
                v-model="port"
                label="BACnet Port"
              >
                <template v-slot:selection="{ item }">
                  <v-chip small>
                    {{ item.hex }}
                  </v-chip>
                  <v-spacer></v-spacer>
                  ({{ item.dez }})
                  <v-spacer></v-spacer>
                </template>
                <template v-slot:item="{ item }">
                  <v-chip>
                    {{ item.hex }}
                  </v-chip>
                  <v-spacer></v-spacer>
                  ({{ item.dez }})
                  <v-spacer></v-spacer>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.deviceId"
                label="Device Id"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="data.vendorId"
                label="Vendor Id"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-select
                :items="getNetworkInterfaces"
                v-model="data.netInterface"
                label="Network Interface"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="secondary" @click="save()">
          Save
        </v-btn>
        <v-btn class="ma-2" color="secondary" @click="cancel()">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "DeviceSettings",
  props: {
    showDialog: Boolean,
    device: Object,
  },
  data() {
    return {
      dialog: this.showDialog,
      data: this.device,
      BACnetPorts: [
        { hex: "BAC0", dez: 47808 },
        { hex: "BAC1", dez: 47809 },
        { hex: "BAC2", dez: 47810 },
        { hex: "BAC3", dez: 47811 },
        { hex: "BAC4", dez: 47812 },
        { hex: "BAC5", dez: 47813 },
        { hex: "BAC5", dez: 47813 },
        { hex: "BAC6", dez: 47814 },
        { hex: "BAC7", dez: 47815 },
        { hex: "BAC8", dez: 47816 },
        { hex: "BAC9", dez: 47817 },
        { hex: "BACA", dez: 47818 },
        { hex: "BACB", dez: 47819 },
        { hex: "BACC", dez: 47820 },
        { hex: "BACD", dez: 47821 },
        { hex: "BACE", dez: 47822 },
        { hex: "BACF", dez: 47823 },
      ],
      port: null,
    };
  },
  mounted() {
    this.port = this.BACnetPorts.find(
      (element) => element.dez === this.device.port
    );
  },
  methods: {
    save() {
      this.data.port = this.port.dez;
      this.$emit("save", this.data);
    },
    cancel() {
      this.$emit("save", null);
    },
  },
  computed: {
    getNetworkInterfaces() {
      let interfaces = [];
      Object.keys(this.device.netInterfaces).forEach((key) => {
        let node = this.device.netInterfaces[key][0];
        interfaces.push({
          value: node.address,
          text: `Name: [${key}] Address: [${node.address}]`,
        });
      });
      return interfaces;
    },
  },
};
</script>
