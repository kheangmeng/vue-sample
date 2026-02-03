import { faker } from '@faker-js/faker'
import type { Product, ProductList, ProductResponse, Pagination, CreateResponse } from '@/types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function handleFetchProducts(
  pagination: Pagination,
): Promise<{ products: ProductList[]; message: string }> {
  await delay(300)
  console.log('pagination:', pagination)
  return {
    products: generateFakeProduct(pagination.limit),
    message: 'Products fetched successfully',
  }
}

export async function handleFetchProductById(
  id: number,
): Promise<{ product: ProductResponse; message: string }> {
  await delay(300)
  console.log('id:', id)
  return {
    product: generateFakeProduct(1)[0],
    message: 'Products fetched successfully',
  }
}

export async function handleCreateProduct(product: Product): Promise<CreateResponse> {
  await delay(300)
  if (product.name && product.categoryId) {
    return {
      message: 'Product created successfully',
      code: 201,
      status: 'success',
    }
  }
  throw new Error('Something went wrong.')
}

export function generateFakeProduct(rows: number) {
  const products = []
  for (let i = 0; i < rows; i++) {
    products.push(createFakeProduct())
  }
  return products
}

function createFakeProduct() {
  return {
    id: faker.number.int(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: {
      id: faker.number.int({ min: 1, max: 5 }),
      name: faker.commerce.department(),
      parentCategoryId: faker.number.int(),
      description: faker.commerce.productDescription(),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.past().toISOString(),
    },
    brand: faker.commerce.productAdjective(),
    supplierId: faker.number.int(),
    tags: [faker.commerce.productAdjective(), faker.commerce.productAdjective()],
    isActive: faker.datatype.boolean(),
    isSellable: faker.datatype.boolean(0.8),
    imageUrl: faker.image.url(),
    taxExempt: faker.datatype.boolean(),
    basePrice: Number(faker.commerce.price()),
    sku: faker.string.alpha(10),
    barcode: faker.string.alpha(10),
    stockQuantity: faker.number.int({ min: 10, max: 1000 }),
    lowStockThreshold: faker.number.int({ min: 1, max: 10 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
}
