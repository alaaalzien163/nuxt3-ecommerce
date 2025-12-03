export type Cart = {
  id?: number
  userId: number
  products: Array<{ productId: number; quantity: number }>
}

export async function listCarts() {
  return await $fetch<Cart[]>('/api/carts')
}

export async function getCart(id: number | string) {
  return await $fetch<Cart>(`/api/carts/${id}`)
}

export async function createCart(payload: Cart) {
  return await $fetch<Cart>('/api/carts', { method: 'POST', body: payload })
}

export async function updateCart(id: number | string, payload: Cart) {
  return await $fetch<Cart>(`/api/carts/${id}`, { method: 'PUT', body: payload })
}

export async function deleteCart(id: number | string) {
  return await $fetch<Cart>(`/api/carts/${id}`, { method: 'DELETE' })
}
