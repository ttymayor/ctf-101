<script setup lang="ts">
useHead({
  title: "CTF 101 - 駭客社迎新闖關",
  meta: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    },
    { name: "description", content: "駭客社新生攤位 CTF 解謎小遊戲" },
  ],
  htmlAttrs: {
    lang: "zh-TW",
    class: "dark",
  },
});
</script>

<template>
  <div
    class="min-h-dvh bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
