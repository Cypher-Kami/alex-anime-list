import type { AnimeDetail } from '~/types/anime'
import type { Episode } from '~/types/episode'
import type { Pagination } from '~/types/pagination'

interface JikanResponse<T> {
  data: T
  pagination?: Pagination
}

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)

  if (!Number.isInteger(id) || id < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid anime id',
    })
  }

  let animeResponse: JikanResponse<AnimeDetail>

  try {
    animeResponse = await $fetch(
      `https://api.jikan.moe/v4/anime/${id}`
    )
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Anime not found',
    })
  }

  let episodeResponse: JikanResponse<Episode[]>

  try {
    episodeResponse = await $fetch(
      `https://api.jikan.moe/v4/anime/${id}/episodes`
    )
  } catch {
    episodeResponse = {
      data: [],
      pagination: undefined,
    }
  }

  return {
    anime: animeResponse.data,
    episodes: episodeResponse.data,
    pagination: episodeResponse.pagination,
  }
})
