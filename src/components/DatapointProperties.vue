<template>
  <div v-if="datapoint">
    <base-data-point :datapoint="datapoint"> </base-data-point>
  </div>
</template>

<script>
import baseDataPoint from "@/components/base/Datapoint";
export default {
  name: "DatapointProperties",
  components: {
    baseDataPoint,
  },
  props: {
    datapoint: Object,
  },
  data() {
    return {
      dp: this.datapoint,
    };
  },
};
</script>

<style></style>
