<template>
  <footer class="bg-neutral text-neutral-content">
    <div
      class="max-w-7xl mx-auto px-6 py-10
             grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      <!-- LEFT -->
      <div class="space-y-2 text-center md:text-left">
        <p class="text-lg font-semibold">
          Alex Anime List
        </p>

        <p class="text-sm text-neutral-content/70">
          Built with Nuxt 3 & Jikan API
        </p>

        <p class="text-xs text-neutral-content/50">
          © {{ new Date().getFullYear() }} Alex Bitar
        </p>
      </div>

      <!-- RIGHT -->
      <nav
        class="flex justify-center md:justify-end gap-6"
        aria-label="Social links"
      >
        <!-- GitHub -->
        <a
          href="https://github.com/Cypher-Kami"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          class="hover:text-primary transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5
                     .08-1.25-.27-2.48-1-3.5
                     .28-1.15.28-2.35 0-3.5
                     0 0-1 0-3 1.5
                     -2.64-.5-5.36-.5-8 0
                     C6 2 5 2 5 2
                     c-.3 1.15-.3 2.35 0 3.5
                     A5.403 5.403 0 0 0 4 9
                     c0 3.5 3 5.5 6 5.5
                     -.39.49-.68 1.05-.85 1.65
                     -.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>

        <!-- LinkedIn -->
        <a
          href="https://www.linkedin.com/in/alex-bitar/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          class="hover:text-primary transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2
                     2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        <!-- Personal site -->
        <a
          href="https://alex-portfolio-orcin.vercel.app/es"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Personal website"
          class="hover:text-primary transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20
                     14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </a>
      </nav>
    </div>
  </footer>
</template>
