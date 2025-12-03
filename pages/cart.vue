<template>
  <div class="container py-5">
    <h3 class="mb-4">Shopping Cart</h3>
    <div v-if="cart.items.length === 0" class="alert alert-info">Your cart is empty.</div>
    <div v-else class="row g-4">
      <div class="col-lg-8">
        <div class="list-group">
          <div v-for="item in cart.items" :key="item.id" class="list-group-item d-flex align-items-center gap-3">
            <img :src="item.image" :alt="item.title" style="width:64px;height:64px;object-fit:contain" />
            <div class="flex-grow-1">
              <div class="fw-semibold">{{ item.title }}</div>
              <div class="text-muted small">${{ item.price.toFixed(2) }}</div>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary" @click="dec(item)">-</button>
              <input type="number" min="1" v-model.number="item.quantity" @change="onQty(item)" class="form-control form-control-sm" style="width:70px" />
              <button class="btn btn-sm btn-outline-secondary" @click="inc(item)">+</button>
            </div>
            <div class="ms-3 fw-semibold">${{ (item.price * item.quantity).toFixed(2) }}</div>
            <button class="btn btn-sm btn-outline-danger ms-3" @click="remove(item.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Summary</h5>
            <div class="d-flex justify-content-between">
              <span>Items</span>
              <span>{{ cart.totalItems }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>Total</span>
              <strong>${{ cart.totalPrice.toFixed(2) }}</strong>
            </div>
            <button class="btn btn-dark w-100">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart.store'
import { onMounted } from 'vue'
const cart = useCartStore()

onMounted(() => cart.loadCartFromStorage())

function onQty(item: any) { cart.updateQuantity(item.id, item.quantity) }
function inc(item: any) { cart.updateQuantity(item.id, item.quantity + 1) }
function dec(item: any) { cart.updateQuantity(item.id, item.quantity - 1) }
function remove(id: number) { cart.removeFromCart(id) }
</script>
