<template>
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
    <!-- Instagram -->
    <NuxtLink
      to="https://www.instagram.com/thuhc2021/"
      target="_blank"
      class="p-3.5 bg-pink-950/30 border border-pink-500/30 rounded-xs text-xs text-pink-300 font-mono transition-opacity hover:opacity-80 block"
    >
      <div class="font-bold flex items-center gap-1.5 mb-1">
        <UIcon name="i-selfhst-instagram" class="size-5" />
        Instagram
      </div>
      <p class="leading-normal">thuhc2021</p>
    </NuxtLink>

    <!-- Discord -->
    <NuxtLink
      to="https://discord.gg/EV8pvJEdRq"
      target="_blank"
      class="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xs text-xs text-indigo-300 font-mono transition-opacity hover:opacity-80 block"
    >
      <div class="font-bold flex items-center gap-1.5 mb-1">
        <UIcon name="i-logos-discord-icon" class="size-5" />
        Discord
      </div>
      <p class="leading-normal">東海大學 - 駭客社</p>
    </NuxtLink>
  </div>
</template>
