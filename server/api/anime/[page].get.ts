import type { Anime } from '~/types/anime'

interface JikanResponse<T> {
  data: T
}

export default defineEventHandler(async (event) => {
  const page = event?.context?.params?.page ?? '1';
  const response = await $fetch<JikanResponse<Anime[]>>(
    `https://api.jikan.moe/v4/anime?limit=24&page=${page}`
  )

  return response.data
})
