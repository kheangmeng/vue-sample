<script setup lang="ts">
import { motion } from 'motion-v'

// const container = {
//   hidden: { opacity: 0 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.002 * i },
//   }),
//   exit: {
//     opacity: 0,
//     transition: { staggerChildren: 0.05, staggerDirection: -1 },
//   },
// }
// const child = {
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: 'spring',
//       damping: 12,
//       stiffness: 100,
//     },
//   },
//   hidden: {
//     opacity: 0,
//     y: 20,
//     transition: {
//       type: 'spring',
//       damping: 12,
//       stiffness: 100,
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -20,
//     transition: {
//       duration: 0.02,
//     },
//   },
// }
// const myIntro =
//   `👋 Hello, I am Kheangmeng, a Senior Web Developer with over eight years of experience in the industry. My preferred development tools include:`.split(
//     ' ',
//   )
</script>
<template>
  <div class="home">
    <v-row style="max-width: 800px">
      <v-col cols="12" class="d-flex align-end">
        <div class="">
          <!-- <div class="d-flex align-center">
            <motion.div
              style="display: flex; flex-wrap: wrap; justify-content: center"
              :variants="container"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.span
                v-for="(word, index) in myIntro"
                :key="index"
                :variants="child"
                className="mr-2 text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
              >
                {{ word }}
              </motion.span>
            </motion.div>
          </div> -->
          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0, transition: { delay: 0.3 } }"
            :exit="{ opacity: 0, transition: { duration: 2.5 } }"
            className="skills"
          >
            <span
              >👋 Hello, I am Kheangmeng, a Senior Web Developer with over eight years of experience
              in the industry. My preferred development tools include:
            </span>
          </motion.div>
          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0, transition: { delay: 0.8 } }"
            :exit="{ opacity: 0, transition: { duration: 2.5 } }"
            className="skills"
          >
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
          </motion.div>
        </div>
      </v-col>
    </v-row>

    <v-row style="max-width: 800px">
      <v-col cols="12">
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0, transition: { delay: 1.2 } }"
          :exit="{ opacity: 0, transition: { duration: 3.5 } }"
          className="skills"
        >
          <span>
            Typically, I develop web applications utilizing Vuetify, Element-Plus, Shadcn, Quasar,
            Angular Material, and Ant Design as my UI frameworks. My primary focus lies in
            addressing challenges related to form logic, validation to align with business
            requirements, and responsive design that adapts seamlessly from mobile devices to
            desktop platforms.
          </span>
        </motion.div>
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

.skills {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
}
</style>
