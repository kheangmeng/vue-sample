<script setup lang="ts">
const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar>
      <v-app-bar-title><v-icon icon="mdi-volleyball" /> GY Group</v-app-bar-title>

      <v-btn
        append-icon="mdi-login"
        color="primary"
        variant="tonal"
        class="mr-2"
        @click="$router.push('/login')"
      >
        Login
      </v-btn>
      <v-btn append-icon="mdi-account" color="green" variant="tonal" class="mr-2"> Sign Up </v-btn>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app class="text-center d-flex flex-column ga-2 py-4" color="grey-lighten-1">
      <div class="d-flex ga-3">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          density="comfortable"
          variant="text"
        ></v-btn>
      </div>

      <v-divider class="my-2" thickness="2" width="50"></v-divider>

      <div class="text-caption font-weight-regular opacity-60">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
        interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed
        massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi
        vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
        sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </div>

      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>@GY Group</strong></div>
    </v-footer>
  </v-layout>
</template>
