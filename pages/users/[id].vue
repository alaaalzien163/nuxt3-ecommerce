<template>
  <div class="container">
    <h1>User Details</h1>
    <div v-if="pending" class="muted">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="user" class="card">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getUser } from '~/composables/useUsers'

const route = useRoute()
const id = computed(() => route.params.id as string)

const { data: user, pending, error } = await useAsyncData(
  () => `user-${id.value}`,
  () => getUser(id.value),
  { watch: [id] }
)
</script>

<style scoped>
.container { max-width: 720px; margin: 2rem auto; padding: 1rem; }
.card { padding: 1rem; border: 1px solid #eee; border-radius: 8px; background: #fff; }
.muted { color: #666; }
.error { color: #b00020; }
</style>
