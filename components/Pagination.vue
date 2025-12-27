<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const currentPage = computed(() =>route.params.page ?? '1')

const pages = ['1', '2', '3', '4']

function goToPage(page: string) {
  router.push(`/anime/${page}`)
}
</script>

<template>
  <div class="join">
    <button
      v-for="page in pages"
      :key="page"
      class="join-item btn btn-lg"
      :class="{ 'btn-active': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>