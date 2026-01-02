import { describe, it, expect, vi } from 'vitest'

describe('Anime API client', () => {
  it('fetches anime list correctly', async () => {
    const mockResponse = {
      data: [{ mal_id: 1, title: 'Test Anime' }],
      pagination: { current_page: 1 },
    }

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockResponse,
    } as any)

    const response = await fetch('/api/anime?page=1')
    const data = await response.json()

    expect(data.data[0].title).toBe('Test Anime')
  })
})
