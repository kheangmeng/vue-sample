<script setup lang="ts"></script>
<template>
  <div class="home">
    <v-row style="max-width: 800px">
      <v-col cols="12" class="d-flex align-end">
        <div class="">
          <div class="d-flex align-center">
            <div>
              👋 Hello there! I’m
              <strong>Kheangmeng</strong>, a frontend developer. I’ve been in this industry for over
              8 years, and here’s what I use:
            </div>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px">
            [<span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(66, 184, 131)"
              >Vue.js</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(97, 218, 251)"
              >React.js</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(0 221 130)"
              >Nuxt.js</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(49, 120, 198)"
              >TypeScript</span
            >
            <span
              style="text-underline-offset: 3px; text-decoration: underline 3px rgb(56, 189, 249)"
              >Tailwind CSS</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(28 102 192)"
              >Vuetify</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(9 180 255)"
              >Quasar</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(62 159 255)"
              >Element-plus</span
            >
            <span style="text-underline-offset: 3px; text-decoration: underline 3px rgb(14 123 255)"
              >Ant Design</span
            >]
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row style="max-width: 800px">
      <v-col cols="12">
        <div>
          Usually I build system admin with Vue.js and React. I use Quasar, Vuetify, Element-plus
          and Ant Design as my UI frameworks. I often solve problem around form logic and validation
          to meet the business requirement.
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
