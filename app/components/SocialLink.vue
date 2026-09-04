<template>
  <div class="w-full grid grid-cols-1 gap-2">
    <!-- Instagram -->
    <NuxtLink
      to="https://www.instagram.com/thuhc2021/"
      target="_blank"
      class="p-3.5 bg-pink-950/30 border border-pink-500/30 rounded-xs text-xs text-pink-300 font-mono transition-opacity hover:opacity-80 block"
    >
      <div class="flex flex-row items-center justify-between gap-2 h-full">
        <div class="font-bold flex flex-row items-center gap-1.5">
          <UIcon name="i-selfhst-instagram" class="size-5" />
          <p>Instagram</p>
        </div>
        <p class="flex flex-row items-center gap-1.5">
          thuhc2021
          <UIcon name="i-lucide-external-link" class="size-4" />
        </p>
      </div>
    </NuxtLink>

    <!-- Discord -->
    <NuxtLink
      to="https://discord.gg/EV8pvJEdRq"
      target="_blank"
      class="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xs text-xs text-indigo-300 font-mono transition-opacity hover:opacity-80 block"
    >
      <div class="flex flex-row items-center justify-between gap-2 h-full">
        <div class="font-bold flex flex-row items-center gap-1.5">
          <UIcon name="i-logos-discord-icon" class="size-5" />
          <p>Discord</p>
        </div>
        <p class="flex flex-row items-center gap-1.5">
          東海大學 - 駭客社
          <UIcon name="i-lucide-external-link" class="size-4" />
        </p>
      </div>
    </NuxtLink>

    <!-- 迎新報名表單 -->
    <NuxtLink
      to="https://docs.google.com/forms/d/e/1FAIpQLSfnG-FexqVULbGiJuNOPpczB4-l3-V_WkzkcVvKNqbkc9Uxlg/viewform"
      target="_blank"
      class="p-3.5 bg-purple-950/30 border border-purple-500/30 rounded-xs text-xs text-purple-300 font-mono transition-opacity hover:opacity-80 block"
    >
      <div class="flex flex-row items-center justify-between gap-2 h-full">
        <div class="font-bold flex flex-row items-center gap-1.5">
          <UIcon name="i-thesvg-color:google-forms-2026" class="size-5" />
          <p>立即報名迎新</p>
        </div>
        <p class="flex flex-row items-center gap-1.5">
          前往填寫表單
          <UIcon name="i-lucide-external-link" class="size-4" />
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
