<template>
  <div class="container py-4">
    <h1 class="mb-4">API Test</h1>

    <div class="row g-4">
      <!-- Login Test -->
      <div class="col-md-6">
        <div class="card p-3 h-100">
          <h5>Login (POST /api/auth/login)</h5>
          <form @submit.prevent="onLogin">
            <div class="mb-2">
              <label class="form-label">Username</label>
              <input v-model="loginForm.username" type="text" class="form-control" required />
            </div>
            <div class="mb-2">
              <label class="form-label">Password</label>
              <input v-model="loginForm.password" type="password" class="form-control" required />
            </div>
            <button class="btn btn-dark" :disabled="loginPending">{{ loginPending ? 'Logging in...' : 'Login' }}</button>
          </form>
          <pre class="mt-3 small bg-light p-2 rounded" v-if="loginRes">{{ loginRes }}</pre>
          <p class="text-danger small mt-2" v-if="loginErr">{{ loginErr }}</p>
        </div>
      </div>

      <!-- Create User Test -->
      <div class="col-md-6">
        <div class="card p-3 h-100">
          <h5>Create User (POST /api/users)</h5>
          <form @submit.prevent="onCreateUser">
            <div class="mb-2">
              <label class="form-label">ID (optional)</label>
              <input v-model.number="createForm.id" type="number" class="form-control" placeholder="Auto if empty" />
            </div>
            <div class="mb-2">
              <label class="form-label">Username</label>
              <input v-model="createForm.username" type="text" class="form-control" required />
            </div>
            <div class="mb-2">
              <label class="form-label">Email</label>
              <input v-model="createForm.email" type="email" class="form-control" required />
            </div>
            <div class="mb-2">
              <label class="form-label">Password</label>
              <input v-model="createForm.password" type="password" class="form-control" required />
            </div>
            <button class="btn btn-dark" :disabled="createPending">{{ createPending ? 'Creating...' : 'Create User' }}</button>
          </form>
          <pre class="mt-3 small bg-light p-2 rounded" v-if="createRes">{{ createRes }}</pre>
          <p class="text-danger small mt-2" v-if="createErr">{{ createErr }}</p>
        </div>
      </div>

      <!-- Get User Test -->
      <div class="col-md-6">
        <div class="card p-3 h-100">
          <h5>Get User (GET /api/users/:id)</h5>
          <form @submit.prevent="onGetUser">
            <div class="mb-2">
              <label class="form-label">User ID</label>
              <input v-model="getId" type="text" class="form-control" placeholder="e.g. 1" required />
            </div>
            <button class="btn btn-dark" :disabled="getPending">{{ getPending ? 'Fetching...' : 'Fetch User' }}</button>
          </form>
          <pre class="mt-3 small bg-light p-2 rounded" v-if="getRes">{{ getRes }}</pre>
          <p class="text-danger small mt-2" v-if="getErr">{{ getErr }}</p>
        </div>
      </div>

      <!-- Products Tests -->
      <div class="col-12">
        <div class="card p-3">
          <h5 class="mb-3">Products</h5>
          <div class="d-flex flex-wrap gap-2 mb-2">
            <button class="btn btn-outline-dark btn-sm" @click="onListProducts">List</button>
          </div>
          <form class="row g-2 align-items-end" @submit.prevent="onCreateProduct">
            <div class="col-md-3"><label class="form-label">Title</label><input v-model="prod.title" class="form-control" required /></div>
            <div class="col-md-2"><label class="form-label">Price</label><input v-model.number="prod.price" type="number" step="0.01" class="form-control" required /></div>
            <div class="col-md-3"><label class="form-label">Category</label><input v-model="prod.category" class="form-control" required /></div>
            <div class="col-md-4"><label class="form-label">Image</label><input v-model="prod.image" class="form-control" required /></div>
            <div class="col-12"><label class="form-label">Description</label><textarea v-model="prod.description" class="form-control" rows="2" required></textarea></div>
            <div class="col-auto"><button class="btn btn-dark">Create Product</button></div>
          </form>
          <div class="row g-2 mt-2">
            <div class="col-md-3"><input v-model="prodId" class="form-control" placeholder="Product ID" /></div>
            <div class="col-auto d-flex gap-2">
              <button class="btn btn-outline-dark btn-sm" @click="onGetProduct">Get</button>
              <button class="btn btn-outline-dark btn-sm" @click="onUpdateProduct">Update</button>
              <button class="btn btn-outline-danger btn-sm" @click="onDeleteProduct">Delete</button>
            </div>
          </div>
          <pre class="mt-3 small bg-light p-2 rounded" v-if="prodRes">{{ prodRes }}</pre>
          <p class="text-danger small mt-2" v-if="prodErr">{{ prodErr }}</p>
        </div>
      </div>

      <!-- Carts Tests -->
      <div class="col-12">
        <div class="card p-3">
          <h5 class="mb-3">Carts</h5>
          <div class="d-flex flex-wrap gap-2 mb-2">
            <button class="btn btn-outline-dark btn-sm" @click="onListCarts">List</button>
          </div>
          <form class="row g-2 align-items-end" @submit.prevent="onCreateCart">
            <div class="col-md-3"><label class="form-label">User ID</label><input v-model.number="cart.userId" type="number" class="form-control" required /></div>
            <div class="col-12"><label class="form-label">Products (JSON)</label><textarea v-model="cartProductsTxt" class="form-control" rows="2" placeholder='[{"productId":1,"quantity":2}]' required></textarea></div>
            <div class="col-auto"><button class="btn btn-dark">Create Cart</button></div>
          </form>
          <div class="row g-2 mt-2">
            <div class="col-md-3"><input v-model="cartId" class="form-control" placeholder="Cart ID" /></div>
            <div class="col-auto d-flex gap-2">
              <button class="btn btn-outline-dark btn-sm" @click="onGetCart">Get</button>
              <button class="btn btn-outline-dark btn-sm" @click="onUpdateCart">Update</button>
              <button class="btn btn-outline-danger btn-sm" @click="onDeleteCart">Delete</button>
            </div>
          </div>
          <pre class="mt-3 small bg-light p-2 rounded" v-if="cartRes">{{ cartRes }}</pre>
          <p class="text-danger small mt-2" v-if="cartErr">{{ cartErr }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { createUser, getUser, type FakeStoreUser } from '~/composables/useUsers'
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, type Product } from '~/composables/useProducts'
import { listCarts, getCart, createCart, updateCart, deleteCart, type Cart } from '~/composables/useCarts'

// Login
const { login } = useAuth()
const loginForm = reactive({ username: '', password: '' })
const loginPending = ref(false)
const loginRes = ref<string | null>(null)
const loginErr = ref<string | null>(null)

async function onLogin() {
  loginErr.value = null
  loginRes.value = null
  loginPending.value = true
  try {
    const res = await login({ ...loginForm })
    loginRes.value = JSON.stringify(res, null, 2)
  } catch (e: any) {
    loginErr.value = e?.message || 'Login failed'
  } finally {
    loginPending.value = false
  }
}

// Create user
const createForm = reactive<FakeStoreUser>({ id: undefined, username: '', email: '', password: '' })
const createPending = ref(false)
const createRes = ref<string | null>(null)
const createErr = ref<string | null>(null)

async function onCreateUser() {
  createErr.value = null
  createRes.value = null
  createPending.value = true
  try {
    const res = await createUser({ ...createForm })
    createRes.value = JSON.stringify(res, null, 2)
  } catch (e: any) {
    createErr.value = e?.message || 'Create user failed'
  } finally {
    createPending.value = false
  }
}

// Get user
const getId = ref('1')
const getPending = ref(false)
const getRes = ref<string | null>(null)
const getErr = ref<string | null>(null)

async function onGetUser() {
  getErr.value = null
  getRes.value = null
  getPending.value = true
  try {
    const res = await getUser(getId.value)
    getRes.value = JSON.stringify(res, null, 2)
  } catch (e: any) {
    getErr.value = e?.message || 'Fetch user failed'
  } finally {
    getPending.value = false
  }
}

// Products
const prod = reactive<Product>({ title: '', price: 0, description: '', category: '', image: '' })
const prodId = ref('1')
const prodRes = ref<string | null>(null)
const prodErr = ref<string | null>(null)

async function onListProducts() {
  prodErr.value = prodRes.value = null
  try { prodRes.value = JSON.stringify(await listProducts(), null, 2) } catch (e:any) { prodErr.value = e?.message || 'List failed' }
}
async function onCreateProduct() {
  prodErr.value = prodRes.value = null
  try { prodRes.value = JSON.stringify(await createProduct({ ...prod }), null, 2) } catch (e:any) { prodErr.value = e?.message || 'Create failed' }
}
async function onGetProduct() {
  prodErr.value = prodRes.value = null
  try { prodRes.value = JSON.stringify(await getProduct(prodId.value), null, 2) } catch (e:any) { prodErr.value = e?.message || 'Get failed' }
}
async function onUpdateProduct() {
  prodErr.value = prodRes.value = null
  try { prodRes.value = JSON.stringify(await updateProduct(prodId.value, { ...prod }), null, 2) } catch (e:any) { prodErr.value = e?.message || 'Update failed' }
}
async function onDeleteProduct() {
  prodErr.value = prodRes.value = null
  try { prodRes.value = JSON.stringify(await deleteProduct(prodId.value), null, 2) } catch (e:any) { prodErr.value = e?.message || 'Delete failed' }
}

// Carts
const cart = reactive<Cart>({ userId: 1, products: [] })
const cartProductsTxt = ref('[{"productId":1,"quantity":2}]')
const cartId = ref('1')
const cartRes = ref<string | null>(null)
const cartErr = ref<string | null>(null)

async function onListCarts() {
  cartErr.value = cartRes.value = null
  try { cartRes.value = JSON.stringify(await listCarts(), null, 2) } catch (e:any) { cartErr.value = e?.message || 'List failed' }
}
async function onCreateCart() {
  cartErr.value = cartRes.value = null
  try {
    cart.products = JSON.parse(cartProductsTxt.value || '[]')
    cartRes.value = JSON.stringify(await createCart({ ...cart }), null, 2)
  } catch (e:any) { cartErr.value = e?.message || 'Create failed' }
}
async function onGetCart() {
  cartErr.value = cartRes.value = null
  try { cartRes.value = JSON.stringify(await getCart(cartId.value), null, 2) } catch (e:any) { cartErr.value = e?.message || 'Get failed' }
}
async function onUpdateCart() {
  cartErr.value = cartRes.value = null
  try {
    cart.products = JSON.parse(cartProductsTxt.value || '[]')
    cartRes.value = JSON.stringify(await updateCart(cartId.value, { ...cart }), null, 2)
  } catch (e:any) { cartErr.value = e?.message || 'Update failed' }
}
async function onDeleteCart() {
  cartErr.value = cartRes.value = null
  try { cartRes.value = JSON.stringify(await deleteCart(cartId.value), null, 2) } catch (e:any) { cartErr.value = e?.message || 'Delete failed' }
}
</script>

<style scoped>
.container { max-width: 980px; }
pre { max-height: 280px; overflow: auto; }
</style>
