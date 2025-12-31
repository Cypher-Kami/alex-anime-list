import type { Episode } from '~/types/episode'

interface JikanEpisodeResponse<T> {
  data: T
}

export default defineEventHandler(async (event) => {
    const animeId = event.context.params?.id
    const episode = event.context.params?.episode

    const response = await $fetch<JikanEpisodeResponse<Episode>>(
        `https://api.jikan.moe/v4/anime/${animeId}/episodes/${episode}`
    )

    return response.data
})
