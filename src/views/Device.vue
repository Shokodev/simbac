<template>
  <v-container>
    <h1 class="ma-2">Device</h1>
    <v-btn @click="save">Save</v-btn>
  </v-container>
</template>

<script>

  export default {
    name: 'Device',

    mounted() {
        window.ipc.on('CREATE_DEVICE',(e) => {
          console.log(e)
        })
    },
    methods: {
      save() {
        window.ipc.send('CREATE_DEVICE', 'pls create me')
      }
    }
  }
</script>