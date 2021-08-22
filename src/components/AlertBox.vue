<template>
  <v-dialog v-if="dialog" v-model="dialog" max-width="400px" persistent>
    <v-card class="pa-8">
      <v-alert text class="text-left" :type="type || 'success'"
        >{{ text }}
      </v-alert>
      <v-btn
        v-if="cancelBtn"
        class="ma-2"
        color="secondary"
        x-large
        @click="cancel()"
      >
        Cancel
      </v-btn>

      <v-btn class="ma-2" color="secondary" x-large @click="confirmed()">
        Ok
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AlertBox",
  props: {
    showDialog: Boolean,
    text: String,
    hasCancel: Boolean,
    type: String,
  },
  data() {
    return {
      dialog: this.showDialog,
      cancelBtn: this.hasCancel || false,
    };
  },
  methods: {
    confirmed() {
      this.$emit("confirm", true);
    },
    cancel() {
      this.$emit("confirm", false);
    },
  },
};
</script>
