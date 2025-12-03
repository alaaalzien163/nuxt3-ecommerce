import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (!id) throw createError({ statusCode: 400, statusMessage: 'User id is required' })
  const body = await readBody(event)
  return await $fetch(`https://fakestoreapi.com/users/${id}`, { method: 'PUT', body })
})
