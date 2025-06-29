<script setup lang="ts">
import hiThere from '@/assets/hi-there.png'
import withMac from '@/assets/with-mac.png'
</script>
<template>
  <v-container style="height: 70vh" class="mt-16">
    <v-row>
      <v-col cols="12" sm="6" class="d-flex align-center">
        <div class="text-">
          <p class="text-subtitle-1">
            Hello there! I’m <strong>Kheangmeng</strong>, a frontend developer. I’ve been in this
            industry for over 8 years, and here’s what I use:
          </p>
          <p class="text-lg text-h6">
            <span style="text-decoration: underline 2px rgb(66, 184, 131)">Vue.js</span>,
            <span style="text-decoration: underline 2px rgb(97, 218, 251)">React.js</span>,
            <span style="text-decoration: underline 2px rgb(0 221 130)">Nuxt.js</span>,
            <span style="text-decoration: underline 2px rgb(49, 120, 198)">TypeScript</span>,
            <span style="text-decoration: underline 2px rgb(56, 189, 249)">Tailwind CSS</span>,
            <span style="text-decoration: underline 2px rgb(28 102 192)">Vuetify</span>,
            <span style="text-decoration: underline 2px rgb(9 180 255)">Quasar</span> and
            <span style="text-decoration: underline 2px rgb(62 159 255)">Element-plus</span>
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="3">
        <v-img class="bg-white" :src="hiThere" width="200"></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="3">
        <v-img class="bg-white" :src="withMac" width="200"></v-img>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center">
        <div class="text-subtitle-1">
          I usually build web admin using Vue.js and TypeScript. I use Quasar, Vuetify and
          Element-plus as my UI frameworks. I also love playing video games and listening to music.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
