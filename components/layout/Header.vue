<!-- components/layout/Header.vue -->
<template>
  <header class="bg-white border-bottom">
    <div class="container py-3">
      <div class="row align-items-center g-3">
        <!-- Logo left -->
        <div class="col-6 col-lg-2">
          <NuxtLink to="/" class="navbar-brand d-inline-flex align-items-center gap-2 fw-bold">
            <img :src="LogoBlack" alt="DEVELOPER TEST" height="70" />
          </NuxtLink>
        </div>

        <!-- Center categories -->
        <div class="col-lg-6 d-none d-lg-flex justify-content-center">
          <ul class="nav gap-4 main-cats">
            <li class="nav-item">
              <NuxtLink to="/categories/1" class="nav-link px-0 text-uppercase">ELECTRONICS</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/categories/2" class="nav-link px-0 text-uppercase">JEWELRY</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/categories/3" class="nav-link px-0 text-uppercase">MEN CLOTHING</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/categories/4" class="nav-link px-0 text-uppercase">WOMEN CLOTHING</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Right links + search + icons -->
        <div class="col-6 col-lg-4 ms-auto">
          <div class="d-flex flex-column align-items-end gap-2">
            <div class="d-none d-md-flex small gap-3 top-links">
              <NuxtLink to="/" class="link-secondary">Home</NuxtLink>
              <NuxtLink to="/about" class="link-secondary">About Us</NuxtLink>
              <NuxtLink to="/media" class="link-secondary">Media Center</NuxtLink>
              <NuxtLink to="/contact" class="link-secondary">Contact Us</NuxtLink>
              <button class="btn btn-link p-0 link-dark text-uppercase">AR</button>
            </div>
            <div class="d-flex align-items-center w-100 gap-2">
              <div class="position-relative flex-grow-1">
                <input type="text" class="form-control form-control-sm search-input pe-5" placeholder="Search" />
                <img :src="SearchIcon" alt="search" class="position-absolute end-0 top-50 translate-middle-y me-2 search-icon" />
              </div>
              <NuxtLink :to="token ? '/profile' : '/login'" class="icon-btn"><img :src="LoginIcon" alt="profile" class="icon-img" /></NuxtLink>
              <NuxtLink to="/favorites" class="icon-btn"><img :src="HeartIcon" alt="favorites" class="icon-img" /></NuxtLink>
              <NuxtLink to="/cart" class="icon-btn position-relative" @click="onCartClick">
                <img :src="CartIcon" alt="cart" class="icon-img" />
                <span v-if="cartStore.totalItems > 0" class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">{{ cartStore.totalItems }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart.store'
import LogoBlack from '~/assets/icons/DEVELOPER TEST - Logo Black.png'
import SearchIcon from '~/assets/icons/Search Mouve.png'
import LoginIcon from '~/assets/icons/Login.png'
import HeartIcon from '~/assets/icons/heart_11613265.png'
import CartIcon from '~/assets/icons/Cart.png'
import { useAuth } from '~/composables/useAuth'
import { useUi } from '~/composables/useUi'

const cartStore = useCartStore()
const { token } = useAuth()
const ui = useUi()

function onCartClick(e){
  if (process.client && window.innerWidth < 992){
    e.preventDefault()
    ui.showCart3DOverlay()
  }
}

onMounted(() => {
  cartStore.loadCartFromStorage()
})
</script>

<style scoped>
.brand-mark { color: #0d0d0d; font-size: 1.4rem; }
.main-cats .nav-link { color: #000; font-weight: 600; letter-spacing: 0.5px; }
.main-cats .nav-link:hover { color: #0d6efd; }
.top-links a { text-decoration: none; }
.icon-btn { color: #000; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; }
.icon-btn:hover { background-color: #f1f1f1; }
.search-input { background-color: #f4f5ec; border-color: #e6e6da; }
.search-input:focus { box-shadow: none; border-color: #c9c9b8; }
.icon-img { width: 18px; height: 18px; object-fit: contain; }
.search-icon { width: 16px; height: 16px; opacity: 0.7; }
</style>