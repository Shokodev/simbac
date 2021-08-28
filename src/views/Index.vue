<template>
    <v-app>
        <layout />
    </v-app>
</template>

<script>
import layout from  '@/layouts/Index'
export default {
    name: 'BaseLayout',
    components: {
        layout
    }
}
</script>