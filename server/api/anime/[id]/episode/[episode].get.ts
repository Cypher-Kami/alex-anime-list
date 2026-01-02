import type { Episode } from '~/types/episode'

interface JikanEpisodeResponse<T> {
  data: T
}

export default defineEventHandler(async (event) => {
  const animeId = Number(event.context.params?.id)
  const episodeNumber = Number(event.context.params?.episode)

  if (!Number.isInteger(animeId) || animeId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid anime id',
    })
  }

  if (!Number.isInteger(episodeNumber) || episodeNumber < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid episode number',
    })
  }

  let response: JikanEpisodeResponse<Episode>

  try {
    response = await $fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/episodes/${episodeNumber}`
    )
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Episode not found',
    })
  }

  return response.data
})
