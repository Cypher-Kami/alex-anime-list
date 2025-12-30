import type { Anime } from "~/types/anime"
import type { Pagination } from "~/types/pagination"

interface JikanResponse<T> {
    data: T
    pagination: Pagination
}

export default defineEventHandler(async (event) => {

  const query = getQuery(event)
  const page = Number(query.page ?? 1)

  const response = await $fetch<JikanResponse<Anime[]>>(
    `https://api.jikan.moe/v4/anime?limit=24&page=${page}`
  )

  return {
    anime: response.data,
    pagination: response.pagination
  }
})
