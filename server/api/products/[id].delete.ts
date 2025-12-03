import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Product id is required' })
  return await $fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' })
})
