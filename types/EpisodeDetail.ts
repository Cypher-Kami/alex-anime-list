import type { s } from "vue-router/dist/router-CWoNjPRp.mjs"
import type { Episode } from "./episode"

export interface EpisodeDetail extends Episode {
    title: string | null
    synopsis: string | null
    duration: string | null
    aired: string | null
}