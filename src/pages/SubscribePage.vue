<script setup lang="ts">
import { ref } from 'vue'
import { notificationTopics } from '../utilities/constants'
import { handleSubscribe, handleUnsubscribe } from '@/api/http/notification/fetchApi'

const profile = localStorage.getItem('profile')
const userId = profile && JSON.parse(profile).id
const userTopics = ref<string[]>(profile ? JSON.parse(profile)?.notification_topics : [])

async function subscribeToTopic(topic: string) {
  try {
    if (topic && userId) {
      await handleSubscribe({ user_id: userId, topic })
      if (profile) {
        userTopics.value.push(topic)
        localStorage.setItem(
          'profile',
          JSON.stringify({
            ...JSON.parse(profile),
            notification_topics: userTopics.value,
          }),
        )
      }
    }
  } catch (error) {
    console.error('Error subscribing to topic:', error)
  }
}

async function unsubscribeFromTopic(topic: string) {
  try {
    if (topic && userId) {
      await handleUnsubscribe({ user_id: userId, topic })
      if (profile) {
        userTopics.value = userTopics.value.filter((t) => t !== topic)
        localStorage.setItem(
          'profile',
          JSON.stringify({
            ...JSON.parse(profile),
            notification_topics: userTopics.value,
          }),
        )
      }
    }
  } catch (error) {
    console.error('Error unsubscribing from topic:', error)
  }
}
</script>

<template>
  <div>
    <h2 class="mb-6">This is an Subscribe page</h2>
    <ul class="d-flex flex-column ga-5" style="list-style-type: none; padding: 0">
      <li v-for="(value, key) in notificationTopics" :key="key">
        <div class="d-flex ga-2 align-center">
          {{ value.toUpperCase() }}:
          <v-btn
            v-if="!userTopics.includes(value)"
            color="primary"
            size="small"
            @click="subscribeToTopic(value)"
          >
            Subscribe
          </v-btn>
          <v-btn v-else color="error" size="small" @click="unsubscribeFromTopic(value)"
            >Unsubscribe</v-btn
          >
        </div>
      </li>
    </ul>
  </div>
</template>
