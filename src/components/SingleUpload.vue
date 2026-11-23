<script setup lang="ts">
import { useSingleUploadFile } from '@/composables/useUpload'

interface Props {
  disableFields?: string[]
  readonly?: boolean
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const { file, objUrl, uploadFile } = useSingleUploadFile()

async function handleFileUpload(fileData: File | File[]): Promise<void> {
  file.value = fileData as File
  await uploadFile(`${import.meta.env.VITE_BASE_API}/api/uploads/single`)
  emit('update:model-value', objUrl.value as string)
}
</script>

<template>
  <v-file-input
    :model-value="file"
    @update:model-value="handleFileUpload"
    label="Image"
    prepend-icon="mdi-image"
    variant="outlined"
    density="compact"
    :disabled="disableFields?.includes('image')"
    :readonly="readonly"
  ></v-file-input>
  <v-img v-if="objUrl" :width="300" aspect-ratio="16/9" cover :src="objUrl"></v-img>
</template>
