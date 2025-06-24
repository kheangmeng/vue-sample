<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'

const emit = defineEmits(['submit'])

const store = useCategoryStore()

function onSubmit(): void {
  if (!store.valid) return
  store.handleSubmit()
  emit('submit')
}
function required(v: string): string | boolean {
  return !!v || 'Field is required'
}
</script>

<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="store.valid" @submit.prevent="onSubmit">
        <v-text-field
          v-model="store.category.name"
          :readonly="store.loading"
          :rules="[required]"
          class="mb-2"
          label="Category name"
          clearable
        ></v-text-field>

        <v-textarea
          label="Description"
          v-model="store.category.description"
          :rules="[required]"
          name="input-7-1"
          variant="filled"
          auto-grow
        ></v-textarea>

        <v-switch
          v-model="store.category.isActive"
          :label="`${store.category.isActive ? 'Active' : 'Inactive'}`"
          hide-details
          inset
          color="primary"
        ></v-switch>
        <br />

        <v-btn
          :disabled="!store.valid"
          :loading="store.loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
