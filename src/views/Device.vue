<template>
  <v-container>
    <h1 class="ma-2">Device</h1>
    <v-btn @click="start">Start</v-btn>
    <v-btn @click="stop">Stop</v-btn>
  </v-container>
</template>

<script>

  export default {
    name: 'Device',

    mounted() {
        window.ipc.on('CREATE_DEVICE',(e) => {
          console.log(e)
        });
        window.ipc.on('DELETE_DEVICE',(e) => {
          console.log(e)
        });
    },
    methods: {
      start() {
        window.ipc.send('CREATE_DEVICE', 'pls create me')
      },
      stop() {
        window.ipc.send('DELETE_DEVICE', 'pls delete me')
      }
    }
  }
</script>