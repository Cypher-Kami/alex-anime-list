import type { Anime } from "./anime";
import type { Pagination } from "./pagination";

export interface PaginatedAnimeResponse {
    anime: Anime[];
    pagination: Pagination;
}