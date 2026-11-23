<script setup lang="ts">
import { useMultiUploadFiles } from '@/composables/useUpload'

interface Props {
  disableFields?: string[]
  readonly?: boolean
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:model-value', value: string[]): void
}>()

const { files, objUrls, uploadFiles } = useMultiUploadFiles()

async function handleFileUpload(fileData: File | File[]): Promise<void> {
  files.value = fileData as File[]
  await uploadFiles(`${import.meta.env.VITE_BASE_API}/api/uploads/multiple`)
  emit('update:model-value', objUrls.value as string[])
}
</script>

<template>
  <v-file-input
    :model-value="files"
    @update:model-value="handleFileUpload"
    label="Image"
    prepend-icon="mdi-image"
    variant="outlined"
    density="compact"
    multiple
    :disabled="disableFields?.includes('image')"
    :readonly="readonly"
  ></v-file-input>
  <v-row>
    <v-col v-for="n in objUrls" :key="n" class="d-flex child-flex" cols="4">
      <v-img :lazy-src="n" :src="n" aspect-ratio="1" class="bg-grey-lighten-2" cover>
        <template v-slot:placeholder>
          <v-row class="fill-height align-center justify-center">
            <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>
