<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCategoriesStore } from '@/stores/category'
import CategoryForm from './CategoryForm.vue'
import type { Category, ProductResponse } from '@/types'

interface Props {
  productData?: ProductResponse
}
const props = defineProps<Props>()
const router = useRouter()
const categoryStore = useCategoriesStore()
const store = useProductStore()
const snackbar = ref(false)
const snackbarMessage = ref('')
const tags = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Toys & Games',
  'Sports & Outdoors',
]

watch(
  () => props.productData,
  (newVal) => {
    if (newVal) {
      handleFetchCategories()
      store.setProduct(newVal)
    }
  },
  { immediate: true },
)
onUnmounted(() => {
  store.resetProduct()
})
async function onSubmit(): Promise<void> {
  if (!store.valid) return
  try {
    snackbarMessage.value = 'Product saved successfully!'
    snackbar.value = true
    await store.handleSubmit()
    if (store.status === 'finished') {
      if (store.loading === false) {
        router.push('/products')
      }
    }
  } catch (error) {
    console.error('Error submitting the form:', error)
  }
}
function required(v: string): string | boolean {
  return !!v || 'Field is required'
}

function itemProps(item: Category): { title: string; subtitle: string } {
  return {
    title: item.name,
    subtitle: item.description || 'No description available',
  }
}

function handleFetchCategories(): void {
  if (categoryStore.data.length === 0) {
    categoryStore.fetchCategories()
  }
}
const popupCategory = ref(false)

const fileUploaded = ref<File | null>(null)
const objUrl = ref<string>('')
async function handleFileUpload(file: File | File[]): Promise<void> {
  // fileUploaded.value = file as File
  // objUrl.value = URL.createObjectURL(fileUploaded.value)
  // store.product.imageUrl = file ? objUrl.value : ''

  // singleUploadFile(file as File)
  multipleUploadFile(file as File[])
}

async function singleUploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API}/api/uploads/single`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}
async function multipleUploadFile(files: File[]): Promise<string> {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_API}/api/uploads/multiple`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading files:', error)
    throw error
  }
}
// function convertFileToBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onload = () => resolve(reader.result as string)
//     reader.onerror = (error) => reject(error)
//     reader.readAsDataURL(file)
//   })
// }
</script>

<template>
  <v-card class="mx-auto px-6 py-8" elevation="8" rounded="lg">
    <v-form v-model="store.valid" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.name"
              :readonly="store.loading"
              :rules="[required]"
              class="mb-2"
              label="Product Name*"
              clearable
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="store.product.categoryId"
              @update:focused="handleFetchCategories"
              item-title="name"
              item-value="id"
              clearable
              :rules="[required]"
              :item-props="itemProps"
              :loading="categoryStore.loading"
              :items="categoryStore.data"
              label="Category*"
              variant="outlined"
              density="compact"
            >
              <template #append>
                <v-btn
                  icon="mdi-plus"
                  :disabled="categoryStore.loading"
                  color="primary"
                  density="compact"
                  @click="popupCategory = true"
                >
                </v-btn>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.brand"
              :readonly="store.loading"
              label="Brand"
              clearable
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.sku"
              :readonly="store.loading"
              label="SKU"
              clearable
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.basePrice"
              label="Base Price*"
              prefix="$"
              :rules="[required]"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-combobox
              v-model="store.product.tags"
              :items="tags"
              label="Tags"
              chips
              multiple
              clearable
              variant="outlined"
              density="compact"
            ></v-combobox>
          </v-col>

          <v-col cols="12" sm="6">
            <v-number-input
              v-model="store.product.stockQuantity"
              control-variant="stacked"
              label="Stock Quantity*"
              :min="0"
              :rules="[required]"
              variant="outlined"
              density="compact"
            ></v-number-input>
          </v-col>

          <v-col cols="12" sm="6">
            <v-number-input
              v-model="store.product.lowStockThreshold"
              control-variant="stacked"
              label="Low Stock Threshold*"
              :min="0"
              :rules="[required]"
              variant="outlined"
              density="compact"
            ></v-number-input>
          </v-col>

          <v-col cols="12">
            <v-textarea
              label="Description*"
              v-model="store.product.description"
              :rules="[required]"
              name="input-7-1"
              auto-grow
              variant="outlined"
              density="compact"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-switch
              v-model="store.product.isActive"
              :label="`${store.product.isActive ? 'Active' : 'Inactive'}`"
              hide-details
              color="primary"
            ></v-switch>
            <v-switch
              v-model="store.product.isSellable"
              :label="`${store.product.isSellable ? 'Sellable' : 'Not Sellable'}`"
              hide-details
              color="primary"
            ></v-switch>
            <v-switch
              v-model="store.product.taxExempt"
              :label="`Tax exempt: ${store.product.taxExempt ? 'Yes' : 'No'}`"
              hide-details
              color="primary"
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-file-input
              :model-value="fileUploaded"
              @update:model-value="handleFileUpload"
              label="Image"
              multiple
              prepend-icon="mdi-image"
              variant="outlined"
              density="compact"
            ></v-file-input>
            <v-img :width="300" aspect-ratio="16/9" cover :src="objUrl"></v-img>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex ga-4 justify-end mt-4">
        <v-btn size="large" type="button" variant="elevated"> Cancel </v-btn>
        <v-btn
          :disabled="!store.valid"
          :loading="store.loading"
          color="primary"
          size="large"
          type="submit"
          variant="elevated"
        >
          Submit
        </v-btn>
      </div>
    </v-form>
  </v-card>

  <v-dialog v-model="popupCategory" max-width="500">
    <v-card prepend-icon="mdi-shape" title="Create Category" class="px-6 pb-6">
      <CategoryForm @submit="popupCategory = false" />
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="2000">
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
