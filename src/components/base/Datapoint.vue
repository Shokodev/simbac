<template>
  <div v-if="dp">
    <v-tabs fixed-tabs background-color="grey lighten-4" dark>
      <v-tab
      v-model="tab"
      >
        Base
      </v-tab>
      <v-tab>
        Extended
      </v-tab>
      <v-tab>
        All
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div v-for="property in dp.properties" :key="property.oid">
          <div v-if="property.depth == viewDepth.base">
            <baseProperty :property="property"></baseProperty>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import baseProperty from "@/components/base/Property";
import { viewDepth } from "@/bacnet/utils/type-helper";

export default {
  name: "datapoint",
  components: {
    baseProperty,
  },
  props: {
    datapoint: Object,
  },
  data() {
    return {
      dp: this.datapoint,
      tab: null,
    };
  },
  computed: {
    viewDepth() {
      return viewDepth;
    },
  },
};
</script>

<style></style>
