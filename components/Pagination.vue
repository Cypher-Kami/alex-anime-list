<script setup lang="ts">
import type { Pagination } from '~/types/pagination'

const props = defineProps<{
  pagination: Pagination
}>()

const router = useRouter()

const pages = computed(() => {
  const { current_page, last_visible_page } = props.pagination

  return [
    current_page - 1,
    current_page,
    current_page + 1
  ].filter(page => page >= 1 && page <= last_visible_page)
})

function goToPage(page: number) {
  if (page < 1 || page > props.pagination.last_visible_page) return
    router.push({
    query: { page }
  })
}
</script>

<template>
  <nav class="flex items-center gap-x-1 mb-4 mr-4" aria-label="Pagination">

    <button
      type="button"
      class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5
             text-sm rounded-lg text-base-content hover:bg-base-200
             disabled:opacity-50 disabled:pointer-events-none"
      :disabled="props.pagination.current_page <= 1"
      aria-label="Previous"
      @click="goToPage(props.pagination.current_page - 1)"
    >
      <svg
        class="shrink-0 size-3.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>Previous</span>
    </button>

    <div class="flex items-center gap-x-1">
      <button
        v-for="page in pages"
        :key="page"
        type="button"
        class="min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-lg
               hover:bg-base-200"
        :class="page === props.pagination.current_page
          ? 'bg-base-300 font-semibold text-base-content'
          : 'text-base-content'"
        :aria-current="page === props.pagination.current_page ? 'page' : undefined"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      type="button"
      class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5
             text-sm rounded-lg text-base-content hover:bg-base-200
             disabled:opacity-50 disabled:pointer-events-none"
      :disabled="!props.pagination.has_next_page"
      aria-label="Next"
      @click="goToPage(props.pagination.current_page + 1)"
    >
      <span>Next</span>
      <svg
        class="shrink-0 size-3.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>

  </nav>
</template>