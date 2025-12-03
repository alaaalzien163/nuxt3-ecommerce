<template>
  <div class="container py-4">
    <h1 class="mb-3">My Account</h1>
    <div class="card p-3">
      <p class="mb-2"><strong>Status:</strong> <span :class="token ? 'text-success' : 'text-danger'">{{ token ? 'Authenticated' : 'Not logged in' }}</span></p>
      <p v-if="token" class="small text-muted mb-3">Token: {{ token }}</p>
      <div class="d-flex gap-2">
        <NuxtLink v-if="!token" to="/login" class="btn btn-dark">Login</NuxtLink>
        <NuxtLink v-else to="/" class="btn btn-outline-secondary" @click.native.prevent="onLogout">Logout</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { token, logout } = useAuth()

function onLogout() {
  logout()
}
</script>
