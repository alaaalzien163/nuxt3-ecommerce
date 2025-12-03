<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit" class="form">
      <label>
        <span>Username</span>
        <input v-model="form.username" type="text" required />
      </label>
      <label>
        <span>Password</span>
        <input v-model="form.password" type="password" required />
      </label>
      <div class="actions">
        <button type="submit" :disabled="pending">{{ pending ? 'Logging in...' : 'Login' }}</button>
        <p v-if="error" class="error">{{ error }}</p>
        <NuxtLink to="/users/new" class="signup-link">Sign up</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { LoginPayload } from '~/composables/useAuth'
import { useAuth } from '~/composables/useAuth'

const { login, token } = useAuth()
const router = useRouter()

const pending = ref(false)
const error = ref<string | null>(null)

const form = reactive<LoginPayload>({
  username: '',
  password: '',
})

onMounted(() => {
  if (token.value) router.push('/profile')
})

async function onSubmit() {
  error.value = null
  pending.value = true
  try {
    await login({ ...form })
    router.push('/profile')
  } catch (e: any) {
    error.value = e?.message || 'Login failed'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.container { max-width: 480px; margin: 2rem auto; padding: 1rem; }
h1 { margin-bottom: 1rem; }
.form { display: flex; flex-direction: column; gap: 1rem; }
label { display: flex; flex-direction: column; gap: 0.25rem; }
input { padding: 0.5rem; border: 1px solid #ddd; border-radius: 6px; }
.actions { display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; }
button { padding: 0.6rem 1rem; background: #111; color: #fff; border-radius: 6px; border: none; cursor: pointer; }
button[disabled] { opacity: 0.6; cursor: not-allowed; }
.error { color: #b00020; }
.signup-link { margin-left: auto; text-decoration: none; }
</style>
