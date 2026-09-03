<script setup lang="ts">
useHead({
  title: "駭客社 - 新生 CTF 闖關",
});
</script>

<template>
  <div
    class="min-h-screen max-w-md mx-auto flex flex-col justify-center items-center px-6 py-12 text-center select-none"
  >
    <UCard class="w-full border-neutral-800 bg-neutral-900/90 shadow-2xl">
      <template #header>
        <Placeholder class="h-8" />
        <div class="terminal-header">
          <div class="dot dot-close"></div>
          <div class="dot dot-min"></div>
          <div class="dot dot-max"></div>
          <span class="terminal-title">bash — 80x24</span>
        </div>
      </template>
      <div class="space-y-6 flex flex-col items-center">
        <div class="space-y-2">
          <div class="text-4xl">🚩</div>
          <h1 class="text-3xl font-black text-white tracking-tight">駭客社</h1>
          <p class="text-sm text-neutral-400">新生攤位 CTF 解謎闖關</p>
        </div>

        <div class="w-full pt-2">
          <UButton
            to="/intro"
            size="lg"
            block
            class="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer justify-center"
          >
            開始挑戰
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
