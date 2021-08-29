<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">Add Datapoint</v-card-title>
      <v-select
        v-model="objectType"
        :items="Object.keys(GET_ESTORE.objectTypes)"
        @change="changeType"
        label="Choose Object Type"
        required
      ></v-select>
      <v-card-text>
        <v-container> </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="objectType === ''"
          class="ma-2"
          color="secondary"
          @click="save()"
        >
          Save
        </v-btn>
        <v-btn class="ma-2" color="secondary" @click="$emit('close')">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddDatapoint",
  props: {
    showDialog: Boolean,
  },
  data() {
    return {
      dialog: this.showDialog,
      objectType: "",
      dp: {},
    };
  },
  mounted() {
    window.ipc.on("NEW_DP", (defaultDp) => {
      console.log(defaultDp);
      this.dp = defaultDp;
    });
    window.ipc.on("ADD_DP", (e) => {
      console.log(e);
      this.READ_ESTORE();
      this.$emit("close");
    });
  },
  methods: {
    save() {
      if (this.dp.oid) {
        window.ipc.send("ADD_DP", this.dp);
      } else {
        this.$emit("close");
      }
    },
    changeType() {
      this.dp = {};
      window.ipc.send("NEW_DP", this.objectType);
    },
    ...mapActions(["READ_ESTORE"]),
  },
  computed: {
    ...mapGetters(["GET_ESTORE"]),
  },
};
</script>
