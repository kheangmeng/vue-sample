<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface MessageType {
  message: string
  sender: string
  user: 'me' | 'other'
}

const icons = [
  'mdi-emoticon',
  'mdi-emoticon-cool',
  'mdi-emoticon-dead',
  'mdi-emoticon-excited',
  'mdi-emoticon-happy',
  'mdi-emoticon-neutral',
  'mdi-emoticon-sad',
  'mdi-emoticon-tongue',
]

const messageInput = ref('Hey!')
const iconIndex = ref(0)
const messages = ref<MessageType[]>([])

const icon = computed(() => {
  return icons[iconIndex.value]
})
function clearMessage() {
  messageInput.value = ''
}
function resetIcon() {
  iconIndex.value = 0
}
function changeIcon() {
  if (iconIndex.value === icons.length - 1) iconIndex.value = 0
  else iconIndex.value++
}

const isConnected = ref(false)
const currentUserId = ref()
const socket = ref<WebSocket>()
const CHAT_ID = 1

function sendMessage(e: Event) {
  e.preventDefault()

  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    const message = {
      chat_id: CHAT_ID,
      message_text: messageInput.value,
    }
    socket.value.send(JSON.stringify(message))
    messageInput.value = ''
  }

  resetIcon()
  clearMessage()
}
function connect() {
  const profile = JSON.parse(localStorage.getItem('profile') ?? '')
  currentUserId.value = profile.id
  if (!currentUserId.value) {
    if (socket.value) socket.value.close()
    isConnected.value = false

    return
  }

  // Close existing connection if switching user
  if (socket.value) {
    socket.value.close()
  }

  // Establish new WebSocket connection for the selected user
  socket.value = new WebSocket(`ws://localhost:3000?userId=${currentUserId.value}`)

  socket.value.onopen = () => {
    isConnected.value = true
  }

  socket.value.onmessage = (event) => {
    const message = JSON.parse(event.data)

    // Style message based on sender
    if (message.sender_user_id === currentUserId.value) {
      messages.value.push({
        message: message.message_text,
        sender: message.sender,
        user: 'me',
      })
    } else {
      messages.value.push({
        message: message.message_text,
        sender: message.sender_name,
        user: 'other',
      })
    }
  }

  socket.value.onclose = () => {
    isConnected.value = false
  }

  socket.value.onerror = (error) => {
    console.error('WebSocket Error:', error)
  }
}

onMounted(() => {
  connect()
})

// const items = ref([
//   {
//     id: 1,
//     action: '15 min',
//     headline: 'Brunch this weekend?',
//     subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
//     title: 'Ali Connors',
//   },
//   {
//     id: 2,
//     action: '2 hr',
//     headline: 'Summer BBQ',
//     subtitle: `Wish I could come, but I'm out of town this weekend.`,
//     title: 'me, Scrott, Jennifer',
//   },
// ])
</script>

<template>
  <div>
    <!-- <v-card class="mx-auto" max-width="500">
      <v-toolbar color="pink">
        <v-toolbar-title>Users</v-toolbar-title>
      </v-toolbar>

      <v-list v-model:selected="userSelect" select-strategy="leaf">
        <v-list-item
          v-for="item in items"
          :key="item.id"
          :value="item.id"
          active-class="text-pink"
          class="py-3"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>

          <v-list-item-subtitle class="mb-1 text-high-emphasis opacity-100">{{
            item.headline
          }}</v-list-item-subtitle>

          <v-list-item-subtitle class="text-high-emphasis">{{
            item.subtitle
          }}</v-list-item-subtitle>

          <template v-slot:append="{ isSelected }">
            <v-list-item-action class="flex-column align-end">
              <small class="mb-4 text-high-emphasis opacity-60">{{ item.action }}</small>

              <v-spacer></v-spacer>

              <v-icon v-if="isSelected" color="yellow-darken-3">mdi-star</v-icon>

              <v-icon v-else class="opacity-30">mdi-star-outline</v-icon>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card> -->

    <v-alert
      v-if="isConnected"
      class="mx-auto mt-6"
      max-width="500"
      density="compact"
      text="Connected to chat."
      title="Connected"
      type="success"
    ></v-alert>
    <v-alert
      v-else
      class="mx-auto mt-6"
      max-width="500"
      density="compact"
      text="Disconnected. Please select a user to reconnect."
      title="Disconnected"
      type="warning"
    ></v-alert>

    <v-card class="mx-auto mt-6" max-width="500">
      <v-toolbar color="blue">
        <v-toolbar-title>Messages</v-toolbar-title>
      </v-toolbar>
      <v-card-item>
        <div style="margin: auto; max-width: 500px; min-height: 150px">
          <div v-for="(msg, index) in messages" :key="index">
            <div v-if="msg.user === 'other'" class="d-flex flex-col">
              <div class="d-flex flex-column">
                <v-sheet class="ma-2 pa-2">
                  {{ msg.message }}
                  <div class="text-caption text-grey-lighten-1">{{ msg.sender }}</div>
                </v-sheet>
              </div>
            </div>
            <div v-else class="d-flex flex-row-reverse">
              <div class="d-flex flex-column">
                <v-sheet class="ma-2 pa-2">
                  {{ msg.message }}
                  <div class="text-caption text-grey-lighten-1">you</div>
                </v-sheet>
              </div>
            </div>
          </div>
        </div>
      </v-card-item>
    </v-card>

    <v-form @submit="sendMessage">
      <v-container max-width="450">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="messageInput"
              :append-icon="messageInput ? 'mdi-send' : 'mdi-microphone'"
              :prepend-icon="icon"
              clear-icon="mdi-close-circle"
              label="Message"
              type="text"
              variant="filled"
              clearable
              autocomplete="off"
              @click:append="sendMessage"
              @click:clear="clearMessage"
              @click:prepend="changeIcon"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
