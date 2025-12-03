export type FakeStoreUser = {
  id?: number
  username: string
  email: string
  password: string
}

export async function createUser(payload: FakeStoreUser) {
  return await $fetch('/api/users', {
    method: 'POST',
    body: payload,
  })
}

export async function getUser(id: number | string) {
  return await $fetch(`/api/users/${id}`)
}

export async function listUsers() {
  return await $fetch('/api/users')
}

export async function updateUser(id: number | string, payload: FakeStoreUser) {
  return await $fetch(`/api/users/${id}`, { method: 'PUT', body: payload })
}

export async function deleteUser(id: number | string) {
  return await $fetch(`/api/users/${id}`, { method: 'DELETE' })
}
