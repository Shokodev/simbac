<template>
  <v-treeview dense :items="datapoints"></v-treeview>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DatapintTree",
  computed: {
    datapoints: function() {
      let result = [];
      let types = this.GET_DEVICE.objectTypes;
      if (this.GET_DEVICE.length === 0) return null;
      Object.keys(types).forEach((key, i) => {
        let dps = this.GET_DEVICE.dp.filter(
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

    ...mapGetters(["GET_DEVICE"]),
  },
};
</script>
