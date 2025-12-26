export interface Anime {
  mal_id: number
  title: string
  images: {
    webp: {
      image_url: string
    }
  }
  synopsis: string | null
  url: string | null
  genres: { name: string }[]
  score: number | null
  episodes: number | null
}
