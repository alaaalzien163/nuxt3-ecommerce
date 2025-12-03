// stores/cart.store.ts
import { defineStore } from 'pinia'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  actions: {
    addToCart(product: any, quantity: number = 1) {
      const existingItem = this.items.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          image: product.image
        })
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.id === productId)
      if (item) {
        item.quantity = Math.max(1, quantity)
        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(this.items))
        }
      }
    },

    clearCart() {
      this.items = []
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart')
      }
    },

    loadCartFromStorage() {
      if (typeof window === 'undefined') return
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart)
        } catch {
          this.items = []
        }
      }
    }
  },

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    cartItems: (state) => state.items
  }
})