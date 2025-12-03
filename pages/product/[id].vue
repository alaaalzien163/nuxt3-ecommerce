<template>
  <div class="container py-5" v-if="product">
    <div class="row g-4">
      <div class="col-md-6 text-center">
        <img :src="product.image" :alt="product.title" class="img-fluid" style="max-height:420px; object-fit:contain;" />
      </div>
      <div class="col-md-6">
        <h3 class="mb-3">{{ product.title }}</h3>
        <p class="text-muted">{{ product.category }}</p>
        <h4 class="mb-3">${{ product.price.toFixed(2) }}</h4>
        <p class="mb-4">{{ product.description }}</p>
        <div class="d-flex align-items-center gap-2">
          <input type="number" v-model.number="qty" class="form-control" style="width:100px" min="1" />
          <button class="btn btn-dark" @click="add()">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart.store'
const cart = useCartStore()
const route = useRoute()
const { data } = await useFetch(() => `https://fakestoreapi.com/products/${route.params.id}`)
const product = computed(() => data.value as any)
const qty = ref(1)
function add() {
  if (product.value) cart.addToCart(product.value, qty.value)
}
</script>
