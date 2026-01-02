<script lang="ts" setup>
import HeadlineText from '~/components/HeadlineText.vue'
import Loading from '~/components/Loading.vue';
import Pagination from '~/components/Pagination.vue';
import ErrorAlert from '~/components/ErrorAlert.vue';
import type { AnimeDetailResponse } from '~/types/animeDetailResponse';
import { useApiError } from '~/composables/useApiError'

const route = useRoute();
const id = computed(() => route.params.id);

const { data: response, pending, error } = await useFetch<AnimeDetailResponse>(() => `/api/anime/${id.value}`);
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
      class=""
    >
      <AnimeDetail
        v-if="response"
        :anime="response.anime"
        :episodes="response.episodes"
      />

    </div>

    <div class="flex justify-end mt-8">
      <Pagination v-if="response"
        :pagination="response?.pagination" />
    </div>
  </div>
</template>