<template>
  <div class="container">
    <h1>Create User</h1>
    <form @submit.prevent="onSubmit" class="form">
      <div class="grid">
        <label>
          <span>ID (optional)</span>
          <input v-model.number="form.id" type="number" min="0" placeholder="Auto if empty" />
        </label>
        <label>
          <span>Username</span>
          <input v-model="form.username" type="text" required />
        </label>
        <label>
          <span>Email</span>
          <input v-model="form.email" type="email" required />
        </label>
        <label>
          <span>Password</span>
          <input v-model="form.password" type="password" required />
        </label>
      </div>

      <div class="actions">
        <button type="submit" :disabled="pending">{{ pending ? 'Creating...' : 'Create User' }}</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">User created with id: {{ success?.id }}</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FakeStoreUser } from '~/composables/useUsers'
import { createUser } from '~/composables/useUsers'

const pending = ref(false)
const error = ref<string | null>(null)
const success = ref<any | null>(null)

const form = reactive<FakeStoreUser>({
  id: undefined,
  username: '',
  email: '',
  password: '',
})

async function onSubmit() {
  error.value = null
  success.value = null
  pending.value = true
  try {
    const res = await createUser({ ...form })
    success.value = res
  } catch (e: any) {
    error.value = e?.message || 'Failed to create user'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.container { max-width: 800px; margin: 2rem auto; padding: 1rem; }
h1 { margin-bottom: 1rem; }
.form { display: flex; flex-direction: column; gap: 1rem; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
label { display: flex; flex-direction: column; gap: 0.25rem; }
input { padding: 0.5rem; border: 1px solid #ddd; border-radius: 6px; }
.actions { display: flex; align-items: center; gap: 1rem; }
button { padding: 0.6rem 1rem; background: #111; color: #fff; border-radius: 6px; border: none; cursor: pointer; }
button[disabled] { opacity: 0.6; cursor: not-allowed; }
.error { color: #b00020; }
.success { color: #0a7b44; }
</style>
