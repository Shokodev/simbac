<template>
  <div v-if="datapoint">
    <baseProperty :property="datapoint.properties[1]">Datapoint </baseProperty>
  </div>
</template>

<script>
import baseProperty from "@/components/base/Property";
export default {
  name: "datapoint",
  components: {
    baseProperty,
  },
  props: {
    datapoint: Object,
  },
};
</script>

<style></style>
