import type { Anime } from "~/types/anime"
import type { Pagination } from "~/types/pagination"

interface JikanResponse<T> {
    data: T
    pagination: Pagination
}

export default defineEventHandler(async (event) => {

  const query = getQuery(event)
  const page = Number(query.page ?? 1)

  if (!Number.isInteger(page) || page < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid page number',
    })
  }

  const response = await $fetch<JikanResponse<Anime[]>>(
    `https://api.jikan.moe/v4/anime?limit=24&page=${page}`
  )

  if (page > response.pagination.last_visible_page) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page out of range',
    })
  }

  return {
    anime: response.data,
    pagination: response.pagination
  }
})