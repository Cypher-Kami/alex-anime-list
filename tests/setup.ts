import { vi } from 'vitest'
import { computed as vueComputed } from 'vue'

vi.mock('#app', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useRoute: () => ({
    params: {},
    query: {},
  }),
  defineNuxtConfig: () => ({}),
  defineNuxtModule: () => ({}),
  defineNuxtPlugin: () => ({}),
}))

vi.stubGlobal('computed', vueComputed)
