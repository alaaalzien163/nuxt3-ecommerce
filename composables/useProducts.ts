export type Product = {
  id?: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export async function listProducts() {
  return await $fetch<Product[]>('/api/products')
}

export async function getProduct(id: number | string) {
  return await $fetch<Product>(`/api/products/${id}`)
}

export async function createProduct(payload: Product) {
  return await $fetch<Product>('/api/products', { method: 'POST', body: payload })
}

export async function updateProduct(id: number | string, payload: Product) {
  return await $fetch<Product>(`/api/products/${id}`, { method: 'PUT', body: payload })
}

export async function deleteProduct(id: number | string) {
  return await $fetch<Product>(`/api/products/${id}`, { method: 'DELETE' })
}
