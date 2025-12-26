<script setup lang="ts">
import Footer from '~/components/Footer.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>