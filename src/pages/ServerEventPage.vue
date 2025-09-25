<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const BASE_API = import.meta.env.VITE_BASE_API
let eventSource: EventSource | null = null

const initEventSource = () => {
  eventSource = new EventSource(`${BASE_API}/api/server-events`) // Replace with your server's SSE endpoint

  eventSource.onopen = (event) => {
    console.log('SSE connection opened.', event)
  }

  eventSource.onmessage = (event) => {
    // Handle generic messages (not associated with a specific event name)
    console.log('Received message:', event.data)
  }

  eventSource.addEventListener('namedEvent', (event) => {
    // Handle messages for a specific named event
    console.log('Received named event:', event.data)
  })

  eventSource.onerror = (error) => {
    console.error('SSE error:', error)
    // Optional: Implement reconnection logic here if needed
  }
}
const closeEventSource = () => {
  if (eventSource) {
    // To close the connection when no longer needed
    eventSource.close()
    eventSource = null
  }
}

const onInitEventSource = () => {
  if (eventSource) return

  initEventSource()
}

onMounted(() => {
  onInitEventSource()
})

onUnmounted(() => {
  closeEventSource()
})
</script>

<template>
  <div>
    <h1>Server Event</h1>
    <VBtn class="mr-2" @click="onInitEventSource">Open Event Source</VBtn>
    <VBtn @click="closeEventSource">Close Event Source</VBtn>
  </div>
</template>
