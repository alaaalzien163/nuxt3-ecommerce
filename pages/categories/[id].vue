<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0 text-uppercase">{{ categoryTitle }}</h3>
      <NuxtLink to="/" class="btn btn-outline-secondary btn-sm">Back to Home</NuxtLink>
    </div>
    <div v-if="pending" class="text-center py-5">
      <div class="spinner-border" role="status"></div>
    </div>
    <div v-else class="row g-4">
      <div v-for="p in products" :key="p.id" class="col-6 col-md-4 col-lg-3">
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/product/ProductCard.vue'
const route = useRoute()

const categoryMap: Record<string, string> = {
  '1': 'electronics',
  '2': 'jewelery',
  '3': "men's clothing",
  '4': "women's clothing"
}

const id = route.params.id as string
const category = categoryMap[id] || 'electronics'
const categoryTitle = category.toUpperCase()

const { data, pending } = await useFetch(() => `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
const products = computed(() => data.value || [])
</script>
