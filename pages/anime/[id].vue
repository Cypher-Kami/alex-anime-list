<script lang="ts" setup>
import HeadlineText from '~/components/HeadlineText.vue'
import AnimeCard from '~/components/AnimeCard.vue'
import Loading from '~/components/Loading.vue';
import Pagination from '~/components/Pagination.vue';
import ErrorAlert from '~/components/ErrorAlert.vue';
import type { AnimeDetailResponse } from '~/types/animeDetailResponse';

const route = useRoute();
const id = computed(() => route.params.id);

const { data: response, pending, error } = await useFetch<AnimeDetailResponse>(() => `/api/anime/${id.value}`);
console.log(response.value?.episodes, 'detail');
</script>

<template>
  <div class="container-full mx-auto">
    <HeadlineText />

    <div v-if="pending" class="text-center mt-4">
      <Loading />
    </div>

    <div v-else-if="error" class="text-center text-red-500">
        <ErrorAlert :error-message="error.statusMessage ?? null" />
    </div>

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