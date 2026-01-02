import { computed, type Ref } from 'vue'

interface ApiErrorState {
  message: string | null
  type: 'rate-limit' | 'network' | 'generic' | null
  canRetry: boolean
}

export function useApiError(error: Ref<any | null>) {
  const state = computed<ApiErrorState>(() => {
    if (!error.value) {
      return {
        message: null,
        type: null,
        canRetry: false,
      }
    }

    // Rate limit (Jikan 429)
    if (error.value?.statusCode === 429) {
      return {
        message:
          'Too many requests. Please wait a moment before trying again.',
        type: 'rate-limit',
        canRetry: true,
      }
    }

    // Network / fetch error
    if (
      error.value?.message?.includes('fetch') ||
      error.value?.cause?.message?.includes('fetch')
    ) {
      return {
        message:
          'Network error. Please check your internet connection.',
        type: 'network',
        canRetry: true,
      }
    }

    // Fallback
    return {
      message:
        'Something went wrong while loading the data.',
      type: 'generic',
      canRetry: false,
    }
  })

  return {
    errorMessage: computed(() => state.value.message),
    errorType: computed(() => state.value.type),
    canRetry: computed(() => state.value.canRetry),
  }
}
