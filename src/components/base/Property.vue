<template>
  <v-card>
    <v-card-text>
      <v-row align="center" class="mb-1">
        <v-icon>mdi-circle-small</v-icon>
        <div class="name">{{ property.pidName }}</div>
        <v-spacer></v-spacer>
        <div class="value">{{ property.value }}</div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Property",
  props: {
    property: Object,
  },
  data() {
    return {
      icon: "",
      propertyType: "",
    };
  },
};
</script>

<style>
.name {
  font-weight: bold;
}
.value {
  margin-left: 5px;
}
</style>
