import { mount } from '@vue/test-utils'
import Pagination from '@/components/Pagination.vue'
import { describe, it, expect, vi } from 'vitest'

// Mock useRouter
const mockPush = vi.fn()
vi.stubGlobal('useRouter', () => ({
  push: mockPush,
  replace: vi.fn(),
}))

vi.stubGlobal('useRoute', () => ({
  params: {},
  query: {},
}))

describe('Pagination', () => {
  it('disables previous button on first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        pagination: {
          current_page: 1,
          has_next_page: true,
          last_visible_page: 10,
        },
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
  })
})
