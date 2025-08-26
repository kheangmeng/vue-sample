<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const socketUrl = import.meta.env.VITE_BASE_SOCKET_API
const socket = ref<WebSocket>()
const isConnected = ref(false)
const message = ref('')
const messages = ref([])

onMounted(() => {
  socket.value = new WebSocket(socketUrl)

  socket.value.onopen = () => {
    isConnected.value = true
    console.log('WebSocket connection opened.')
  }

  socket.value.onmessage = (event: MessageEvent<any>) => {
    messages.value.push(event?.data)
  }

  socket.value.onclose = () => {
    isConnected.value = false
    console.log('WebSocket connection closed.')
  }

  socket.value.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.close()
  }
})

const sendMessage = () => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN && message.value) {
    socket.value.send(message.value)
    message.value = ''
  }
}
</script>

<template>
  <div>
    <h1>Vue 3 WebSocket Client</h1>
    <p v-if="isConnected">Status: Connected</p>
    <p v-else>Status: Disconnected</p>
    <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>

    <div class="messages">
      <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
    </div>
  </div>
</template>
