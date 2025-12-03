<template>
  <div class="card product-card h-100">
    <NuxtLink :to="`/product/${product.id}`" class="text-decoration-none text-dark">
      <img :src="product.image" class="card-img-top p-3" :alt="product.title" style="height: 200px; object-fit: contain;" />
    </NuxtLink>
    <div class="card-body d-flex flex-column">
      <h6 class="card-title mb-2 text-truncate" :title="product.title">{{ product.title }}</h6>
      <div class="mb-2 text-muted small text-truncate-2" :title="product.description">{{ product.description }}</div>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <strong class="text-dark">${{ product.price.toFixed(2) }}</strong>
        <button class="btn btn-sm btn-dark" @click="onAddToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart.store'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const props = defineProps<{ product: Product }>()
const cart = useCartStore()

function onAddToCart() {
  cart.addToCart(props.product, 1)
}
</script>

<style scoped>
.text-truncate-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
