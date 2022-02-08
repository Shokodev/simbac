<template>
  <div v-if="dp">
    <v-tabs v-model="tab" fixed-tabs background-color="secondary">
      <v-tab v-for="depth in depths" :key="depth">
        {{ depth }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pt-2">
      <v-tab-item v-for="depth in depths" :key="depth">
        <div v-for="property in dp.properties" :key="property.oid">
          <div v-if="property.depth == viewDepth[depth]">
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
      depths: ["base", "extended", "all"],
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
