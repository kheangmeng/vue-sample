<script setup lang="ts"></script>
<template>
  <div class="home">
    <v-row style="max-width: 800px">
      <v-col cols="12" class="d-flex align-end">
        <div class="">
          <div class="d-flex align-center">
            <div>
              👋 Hello, I am Kheangmeng, a frontend developer with over eight years of experience in
              the industry. My preferred development tools include:
            </div>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px">
            [<span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(66, 184, 131)"
              >Vue.js,</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(97, 218, 251)"
              >React.js,</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(246, 55, 227)"
              >Angular,</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(44 104 44)"
              >Node.js,</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(0 221 130)"
              >Nuxt.js,</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(0 0 0)"
              >Next.js,</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(49, 120, 198)"
              >TypeScript,</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(56, 189, 249)"
              >Tailwind CSS</span
            >]
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row style="max-width: 800px">
      <v-col cols="12">
        <div>
          Typically, I develop web applications utilizing Vuetify, Element-Plus, Shadcn, Quasar,
          Angular Material, and Ant Design as my UI frameworks. My primary focus lies in addressing
          challenges related to form logic, validation to align with business requirements, and
          responsive design that adapts seamlessly from mobile devices to desktop platforms.
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style>
@media (min-width: 1024px) {
  .home {
    font-size: 1.5em;
    min-height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
