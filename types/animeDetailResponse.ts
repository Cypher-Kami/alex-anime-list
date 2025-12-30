import type { AnimeDetail } from "./anime"
import type { Episode } from "./episode"
import type { Pagination } from "./pagination"

export interface AnimeDetailResponse {
    anime: AnimeDetail
    episodes: Episode[]
    pagination: Pagination
}