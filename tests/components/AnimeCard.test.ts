import { mount } from '@vue/test-utils'
import AnimeCard from '@/components/AnimeCard.vue'
import { describe, it, expect } from 'vitest'

const mockAnime = {
  mal_id: 1,
  title: 'Cowboy Bebop',
  images: {
    webp: {
      image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.webp',
    },
  },
  synopsis: 'Space bounty hunters.',
  score: 8.9,
  episodes: 26,
  genres: [{ name: 'Action' }],
  url: 'https://myanimelist.net/anime/1',
}

describe('AnimeCard', () => {
  it('renders anime title and image', () => {
    const wrapper = mount(AnimeCard, {
      props: {
        anime: mockAnime,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Cowboy Bebop')

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(mockAnime.images.webp.image_url)
  })
})
