<script lang="ts" setup>
import { computed } from 'vue'
import type { Anime } from '~/types/anime'

const props = defineProps<{
  anime: Anime
}>()
const { anime } = props;

const MAX_CHARS = 200

const shortSynopsis = computed(() => {
  if (!anime.synopsis) return ''
  return anime.synopsis.length > MAX_CHARS
    ? anime.synopsis.slice(0, MAX_CHARS) + '...'
    : anime.synopsis
})

</script>

<template>
  <div class="m-4 flex bg-base-100 border-gray-500/20 rounded-md overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">

    <NuxtImg
      :src="anime.images.webp.image_url"
      :alt="anime.title"
      class="w-32 sm:w-36 object-cover"
      loading="lazy"
      format="webp"
      preset="hero"
      sizes="(max-width: 768px) 100vw, 1200px"
    />

    <div class="p-4 flex flex-col gap-2">

      <h3 class="text-base-content text-md font-semibold">
        {{ anime.title }}
      </h3>

      <div class="flex items-center gap-1 text-sm text-base-content/70">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="text-yellow-400"
        >
          <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a.53.53 0 0 0-.495 0l-4.618 2.428a.53.53 0 0 1-.77-.56l.881-5.139a.53.53 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a.53.53 0 0 0 1.597-1.16z"/>
        </svg>
        <span>{{ anime.score ?? 'N/A' }}</span>
      </div>

      <p class="text-xs text-base-content/70 break-words whitespace-normal max-w-xs">
        {{ shortSynopsis }}
      </p>

      <div class="flex flex-wrap gap-1">
        <span
          v-for="genre in anime.genres"
          :key="genre.name"
          class="badge badge-primary text-xs"
        >
          {{ genre.name }}
        </span>
      </div>

        <NuxtLink
            v-if="anime.mal_id"
            :to="`/anime/${anime.mal_id}`"
            target="_blank"
            class="mt-auto text-sm font-medium text-primary hover:underline"
            aria-label="View details of {{ anime.title }}"
        >
        See More
      </NuxtLink>
    </div>
  </div>
</template>