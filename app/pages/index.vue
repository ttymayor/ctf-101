<script setup lang="ts">
import CommandLine from "@/components/CommandLine.vue";

useHead({
  title: "駭客社 - 新生 CTF 闖關",
});
</script>

<template>
  <div class="flex flex-col items-start text-center gap-4">
    <CommandLine>whoami</CommandLine>
    <div
      class="w-full flex flex-col rounded-r-xs items-start gap-2 bg-black/20 p-4 border-l-2 border-primary"
    >
      <h1 class="font-black text-white tracking-tight"># 🚩 東海駭客社 THU Hacker Club</h1>
      <p class="text-sm text-neutral-400">新生攤位 CTF 解謎闖關</p>
    </div>
    <CommandLine>./play-ctf</CommandLine>
    <div class="w-full">
      <UButton
        to="/intro"
        size="lg"
        block
        trailing-icon="i-lucide-arrow-right"
        :ui="{ trailingIcon: 'ms-0' }"
        class="w-full rounded-xs bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer justify-center"
      >
        開始挑戰
      </UButton>
    </div>
  </div>
</template>
