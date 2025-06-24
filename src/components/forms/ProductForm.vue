<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { useCategoriesStore } from '@/stores/category'
import CategoryForm from './CategoryForm.vue'
import type { Category } from '@/types'

const categoryStore = useCategoriesStore()
const store = useProductStore()
const tags = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Toys & Games',
  'Sports & Outdoors',
]

function onSubmit(): void {
  if (!store.valid) return
  store.handleSubmit()
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
  if (categoryStore.list.length === 0) {
    categoryStore.fetchCategories()
  }
}
const popupCategory = ref(false)

const fileUploaded = ref<File | null>(null)
const objUrl = ref<string>('')
async function handleFileUpload(file: File | File[]): Promise<void> {
  fileUploaded.value = file as File
  objUrl.value = URL.createObjectURL(fileUploaded.value)
  store.product.imageUrl = file ? objUrl.value : ''
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
              label="Product Name"
              clearable
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-textarea
              label="Description"
              v-model="store.product.description"
              :rules="[required]"
              name="input-7-1"
              auto-grow
              variant="outlined"
            ></v-textarea>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.brand"
              :readonly="store.loading"
              label="Brand"
              clearable
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.sku"
              :readonly="store.loading"
              label="SKU"
              clearable
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.product.basePrice"
              label="Base Price"
              prefix="$"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-combobox
              v-model="store.product.tags"
              :items="tags"
              label="Tags"
              chips
              multiple
              variant="outlined"
            ></v-combobox>
          </v-col>

          <v-col cols="12" sm="6">
            <v-number-input
              v-model="store.product.stockQuantity"
              control-variant="stacked"
              label="Stock Quantity"
              :min="0"
              variant="outlined"
            ></v-number-input>
          </v-col>

          <v-col cols="12" sm="6">
            <v-number-input
              v-model="store.product.lowStockThreshold"
              control-variant="stacked"
              label="Low Stock Threshold"
              :min="0"
              variant="outlined"
            ></v-number-input>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="store.product.categoryId"
              @update:focused="handleFetchCategories"
              item-title="name"
              item-value="id"
              :item-props="itemProps"
              :loading="categoryStore.loading"
              :items="categoryStore.list"
              label="Category"
              variant="outlined"
            >
              <template #append>
                <v-btn
                  icon="mdi-plus"
                  :disabled="categoryStore.loading"
                  size="md"
                  @click="popupCategory = true"
                >
                </v-btn>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12">
            <v-switch
              v-model="store.product.isActive"
              :label="`${store.product.isActive ? 'Active' : 'Inactive'}`"
              hide-details
              inset
              color="primary"
            ></v-switch>
            <v-switch
              v-model="store.product.isSellable"
              :label="`${store.product.isSellable ? 'Sellable' : 'Not Sellable'}`"
              hide-details
              inset
              color="primary"
            ></v-switch>
            <v-switch
              v-model="store.product.taxExempt"
              :label="`Tax exempt: ${store.product.taxExempt ? 'Yes' : 'No'}`"
              hide-details
              inset
              color="primary"
            ></v-switch>
          </v-col>
          <v-col cols="12">
            <v-file-input
              :model-value="fileUploaded"
              @update:model-value="handleFileUpload"
              label="Image"
              prepend-icon="mdi-image"
              variant="outlined"
            ></v-file-input>
            <v-img :width="300" aspect-ratio="16/9" cover :src="objUrl"></v-img>
          </v-col>
        </v-row>
      </v-container>
      <div class="text-center">
        <v-btn
          :disabled="!store.valid"
          :loading="store.loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Submit
        </v-btn>
      </div>
    </v-form>
  </v-card>

  <v-dialog v-model="popupCategory" width="auto">
    <v-card max-width="400" prepend-icon="mdi-plus" title="Create Category">
      <CategoryForm @submit="popupCategory = false" />
    </v-card>
  </v-dialog>
</template>
