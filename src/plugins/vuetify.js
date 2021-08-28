import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    default: "dark",
    themes: {
      light: {
        primary: colors.blue,
        secondary: "#304156",
        success: colors.green,
        danger: colors.red,
        warning: colors.deepOrange,
        info: colors.indigo,

        dark: "#242939",

        background: "#f2f3f8"
      },
      dark: {
        primary: colors.blue,
        secondary: "#304156",
        success: colors.green,
        danger: colors.red,
        warning: colors.deepOrange,
        info: colors.indigo
      }
    }
  },
});
