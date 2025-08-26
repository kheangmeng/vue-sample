<script setup lang="ts">
import { state, socket, connect, disconnect } from '@/composables/socket'

function sendMsg() {
  socket.emit('msg', 'from client socket')
}
</script>
<template>
  <h1>Socket is: {{ state.connected ? 'Connected' : 'Disconnected' }}</h1>
  <div class="flex gap-2">
    <v-btn class="ma-2" @click="connect()">Connect</v-btn>
    <v-btn class="ma-2" @click="disconnect()">Disconnect</v-btn>
    <v-btn class="ma-2" @click="sendMsg()">Send</v-btn>
  </div>
</template>
