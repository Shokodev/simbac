<template>
  <v-dialog v-if="dialog" v-model="dialog" persistent>
    <v-card class="pa-4">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            solo-inverted
            v-model="data.name"
            label="Device Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            solo-inverted
            v-model="data.port"
            label="Port"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            solo-inverted
            v-model="data.deviceId"
            label="Device Id"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            solo-inverted
            v-model="data.vendorId"
            label="Vendor Id"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="ma-2" color="secondary" @click="save()">
        Save
      </v-btn>
      <v-btn class="ma-2" color="secondary" @click="cancel()">
        Cancel
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AlertBox",
  props: {
    showDialog: Boolean,
    device: Object,
  },
  data() {
    return {
      dialog: this.showDialog,
      data: this.device,
    };
  },
  methods: {
    save() {
      this.$emit("save", this.data);
    },
    cancel() {
      this.$emit("save", null);
    },
  },
};
</script>
