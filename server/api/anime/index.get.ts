import type { Anime } from '~/types/anime'

interface JikanResponse<T> {
  data: T
}

export default defineEventHandler(async () => {
  const response = await $fetch<JikanResponse<Anime[]>>(
    'https://api.jikan.moe/v4/anime?limit=24&page=1'
  )

  return response.data
})
