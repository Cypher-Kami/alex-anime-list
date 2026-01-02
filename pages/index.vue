<script lang="ts" setup>
import HeadlineText from '~/components/HeadlineText.vue'
import AnimeCard from '~/components/AnimeCard.vue'
import Loading from '~/components/Loading.vue';
import Pagination from '~/components/Pagination.vue';
import ErrorAlert from '~/components/ErrorAlert.vue';
import type { PaginatedAnimeResponse } from '~/types/paginatedAnimeResponse';
import { useApiError } from '~/composables/useApiError'

const route = useRoute()

const page = computed(() => {
  const value = Number(route.query.page)
  return Number.isNaN(value) || value < 1 ? 1 : value
})
const { data: response, pending, error } = await useFetch<PaginatedAnimeResponse>(() => `/api/anime?page=${page.value}`)
const { errorMessage } = useApiError(error)
</script>

<template>
  <div class="container-full mx-auto">
    <HeadlineText />

    <div v-if="pending" class="text-center mt-4">
      <Loading />
    </div>

    <ErrorAlert
      v-else-if="errorMessage"
      :error-message="errorMessage"
    />

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <AnimeCard
          v-if="response"
          v-for="anime in response?.anime"
          :key="anime.mal_id"
          :anime="anime"
      />
    </div>

    <div class="flex justify-end mt-8">
        <Pagination
            v-if="response"
            :pagination="response.pagination"
        />
    </div>
  </div>
</template>