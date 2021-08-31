<template>
  <app-card v-bind="$attrs" class="mt-4">
    <v-card-title class="align-start">
      <v-sheet
        :color="color"
        :width="fullHeader ? '100%' : undefined"
        class="overflow-hidden mt-n9 transition-swing"
        elevation="6"
        max-width="100%"
        rounded
      >
        <div v-if="hasHeading" dark>
          <div v-if="icon" :class="iconSmall ? 'pa-7' : 'pa-8'">
            <v-icon :large="!iconSmall" v-text="icon" />
          </div>

          <slot name="heading" />

          <div v-if="heading" class="text-h4 white--text pa-7">
            {{ heading }}
          </div>
        </div>
      </v-sheet>

      <div
        v-if="hasTitle"
        :class="fullHeader ? 'pt-4' : 'pl-3'"
        class="text-h4"
      >
        <slot name="title" />

        <template v-if="title">
          {{ title }}
        </template>

        <div class="text-subtitle-1 mb-n4">
          <slot name="subtitle" />

          <template v-if="subtitle">
            {{ subtitle }}
          </template>
        </div>
      </div>
    </v-card-title>

    <slot />

    <template v-if="$slots.actions">
      <v-divider class="mt-2 mx-4" />

      <v-card-actions class="px-4 text-caption grey--text">
        <slot name="actions" />
      </v-card-actions>
    </template>
  </app-card>
</template>

<script>
import AppCard from "@/components/app/Card";
export default {
  name: "Card",
  components: {
    AppCard,
  },

  props: {
    color: String,
    fullHeader: Boolean,
    heading: String,
    icon: String,
    iconSmall: Boolean,
    subtitle: String,
    title: String,
  },

  computed: {
    hasHeading() {
      return !!(this.icon || this.heading || this.$slots.heading);
    },
    hasTitle() {
      return !!(
        this.title ||
        this.subtitle ||
        this.$slots.title ||
        this.$slots.subtitle
      );
    },
  },
};
</script>

<style lang="sass">

</style>

