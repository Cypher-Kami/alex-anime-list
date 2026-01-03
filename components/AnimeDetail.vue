<script setup lang="ts">
import type { AnimeDetail } from '~/types/anime'
import type { Episode } from '~/types/episode'

import { Calendar, Film, Star, Clock, X } from 'lucide-vue-next'
import type { EpisodeDetail } from '~/types/EpisodeDetail';
import { useApiError } from '~/composables/useApiError'
import Loading from '~/components/Loading.vue';

const props = defineProps<{
  anime: AnimeDetail
  episodes: Episode[]
}>()

/* ---------- helpers ---------- */
function formatDate(date: string | null) {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/* ---------- modal state ---------- */
const isOpen = ref(false)
const selectedEpisode = ref<number | null>(null)

async function openEpisode(ep: number) {
  selectedEpisode.value = ep
  isOpen.value = true
  await refresh()
}

function closeModal() {
  isOpen.value = false
  selectedEpisode.value = null
}

const {
  data: episodeDetail,
  pending,
  error,
  refresh,
} = useAsyncData<EpisodeDetail>(
  'episode-detail',
  () =>
    $fetch(
      `/api/anime/${props.anime.mal_id}/episode/${selectedEpisode.value}`
    ),
  {
    immediate: false,
  }
)
const { errorMessage } = useApiError(error)

</script>

<template>
  <article class="max-w-6xl mx-auto px-4 pb-24">

    <!-- HERO -->
    <section class="mb-16">
      <div class="relative h-[460px] rounded-2xl overflow-hidden bg-gradient-to-br from-base-200 to-base-300">
        <NuxtImg
          :src="anime.images.webp.image_url"
          :alt="anime.title"
          class="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          preset="hero"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 1200px"
        />

        <NuxtImg
          :src="anime.images.webp.image_url"
          :alt="anime.title"
          class="relative z-10 h-full object-contain mx-auto"
          preset="hero"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 1200px"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"></div>

        <div
          class="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto
                 bg-black/70 backdrop-blur-md rounded-xl p-6 max-w-3xl z-30"
        >
          <h1 class="text-4xl font-bold text-white mb-4">
            {{ anime.title }}
          </h1>

          <div class="flex flex-wrap gap-6 text-sm text-white">
            <div v-if="anime.year" class="flex items-center gap-2">
              <Calendar :size="16" />
              <span>{{ anime.year }}</span>
            </div>

            <div v-if="anime.episodes" class="flex items-center gap-2">
              <Film :size="16" />
              <span>{{ anime.episodes }} episodes</span>
            </div>

            <div v-if="anime.rating" class="flex items-center gap-2">
              <Star :size="16" />
              <span>{{ anime.rating }}</span>
            </div>

            <div v-if="anime.duration" class="flex items-center gap-2">
              <Clock :size="16" />
              <span>{{ anime.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SYNOPSIS -->
    <section class="max-w-6xl mb-20">
      <h2 class="text-2xl font-semibold mb-4">
        Synopsis
      </h2>
      <p class="text-base-content leading-relaxed text-lg">
        {{ anime.synopsis }}
      </p>
    </section>

    <!-- EPISODES -->
    <section class="max-w-6xl">
      <h2 class="text-2xl font-semibold mb-8">
        Episodes
      </h2>

      <div v-if="episodes.length === 0" class="text-base-content/70">
        No episodes available.
      </div>

      <div class="space-y-3">
        <button
          v-for="episode in episodes"
          :key="episode.mal_id"
          @click="openEpisode(episode.mal_id)"
          class="w-full text-left p-4 rounded-xl bg-base-200
                 hover:bg-base-300 transition"
        >
          <div class="flex justify-between items-center">
            <div>
              <span class="font-medium">
                Episode {{ episode.mal_id }}
              </span>
              <span
                v-if="episode.title"
                class="block text-sm text-base-content/70"
              >
                {{ episode.title }}
              </span>
            </div>

            <span class="text-xs text-base-content/70">
              {{ formatDate(episode.aired) }}
            </span>
          </div>
        </button>
      </div>
    </section>
  </article>

  <!-- EPISODE MODAL -->
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center
             bg-black/60 backdrop-blur"
    >
      <div class="bg-base-100 rounded-2xl w-full max-w-lg p-6 relative">

        <!-- Close -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-base-content/70
                 hover:text-base-content"
        >
          <X :size="20" />
        </button>

        <!-- Loading -->
        <div v-if="pending" class="py-16 text-center">
          <Loading />
        </div>

        <!-- Error -->
        <div v-else-if="errorMessage" class="py-12 text-center">
          <p class="text-red-500 mb-4">
            {{ errorMessage }}
          </p>
        </div>

        <!-- Content -->
        <div v-else-if="episodeDetail" class="space-y-5">

          <h3 class="text-xl font-semibold">
            Episode {{ episodeDetail.mal_id }}
          </h3>

          <p v-if="episodeDetail.title" class="text-base-content">
            {{ episodeDetail.title }}
          </p>

          <div class="flex justify-between items-center text-sm text-base-content/70">
            <span>
              {{ formatDate(episodeDetail.aired) }}
            </span>
          </div>

          <p
            v-if="episodeDetail.synopsis"
            class="text-sm text-base-content"
          >
            {{ episodeDetail.synopsis }}
          </p>

          <div
            v-if="episodeDetail.title_japanese"
            class="text-sm text-base-content/70"
          >
            <span class="block text-xs uppercase tracking-wide mb-1">
              Japanese title
            </span>
            {{ episodeDetail.title_japanese }}
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
