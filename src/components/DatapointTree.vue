<template>
  <v-treeview dense :items="datapoints">
    <template v-slot:prepend="{ item }">
      <v-icon v-if="item.children">{{icons[item.name]}}</v-icon>
      <v-icon v-else>mdi-circle-small</v-icon>
    </template>
  </v-treeview>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DatapintTree",
  data: () => ({
    icons: {
      ANALOG_INPUT: "mdi-import",
      ANALOG_OUTPUT: "mdi-export",
    },
  }),
  computed: {
    datapoints: function() {
      let result = [];
      let types = this.GET_ESTORE.objectTypes;
      if (this.GET_ESTORE.length === 0) return null;
      Object.keys(types).forEach((key, i) => {
        let dps = this.GET_ESTORE.dp.filter(
          (dp) => dp.oid.split(":")[0] == types[key]
        );
        if (dps.length > 0) {
          result.push({
            id: i,
            name: key,
            children: dps.map((dp, i) => {
              dp.id = i;
              dp.name =
                dp.properties.find((p) => p.id == 77).value || "Not Found";
              return dp;
            }),
          });
        }
      });
      return result;
    },

    ...mapGetters(["GET_ESTORE"]),
  },
};
</script>
