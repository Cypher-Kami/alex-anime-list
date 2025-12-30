import type { AnimeDetail } from '~/types/anime';
import type { Episode } from '~/types/episode';
import type { Pagination } from '~/types/pagination';

interface JikanResponse<T> {
  data: T
  pagination?: Pagination
}

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id ?? '1';
  const responseAnime = await $fetch<JikanResponse<AnimeDetail>>(
    `https://api.jikan.moe/v4/anime/${id}`
  )
  const responseEpisode = await $fetch<JikanResponse<Episode[]>>(
    `https://api.jikan.moe/v4/anime/${id}/episodes`
  )

  return {
    anime: responseAnime.data,
    episodes: responseEpisode.data,
    pagination: responseEpisode.pagination
  }
})
