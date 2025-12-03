import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  return await $fetch('https://fakestoreapi.com/products')
})
