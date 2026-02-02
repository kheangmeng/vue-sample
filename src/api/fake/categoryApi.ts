import { faker } from '@faker-js/faker'
import type { Category, CategoryResponse, Pagination } from '@/types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function handleFetchCategories(
  pagination: Pagination,
): Promise<{ categories: CategoryResponse[]; message: string }> {
  await delay(1000)
  console.log('pagination:', pagination)
  return {
    categories: generateFakeCategory(10),
    message: 'Categories fetched successfully',
  }
}

export async function handleCreateCategory(
  category: Category,
): Promise<{ category: CategoryResponse; message: string }> {
  await delay(1000)
  if (category.name) {
    return {
      category: {
        id: Math.floor(Math.random() * 1000),
        name: category.name,
        parentCategoryId: category.parentCategoryId,
        description: category.description,
        isActive: category.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'Category created successfully',
    }
  }
  throw new Error('Something went wrong.')
}

export function generateFakeCategory(rows: number) {
  const categories = []
  for (let i = 0; i < rows; i++) {
    categories.push(createFakeCategory())
  }
  return categories
}

function createFakeCategory() {
  return {
    id: faker.number.int({ min: 1, max: 5 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    // parentCategoryId: faker.number.int(),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }
}
