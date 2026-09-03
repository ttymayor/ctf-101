<script setup lang="ts">
useHead({
  title: "駭客社 - 新生 CTF 闖關",
});
</script>

<template>
  <TerminalSession class="w-full flex flex-col items-start gap-4 min-h-[220px]">
    <!-- 步驟 1: 執行 whoami -->
    <CommandLine>whoami</CommandLine>

    <!-- 步驟 2: whoami 輸出結果 -->
    <TerminalOutput>
      <div
        class="w-full flex flex-col rounded-r-xs items-start gap-2 bg-black/20 p-4 border-l-2 border-primary text-left"
      >
        <h1 class="font-black text-white tracking-tight"># 🚩 東海駭客社 THU Hacker Club</h1>
        <p class="text-sm text-neutral-400">新生攤位 CTF 解謎闖關</p>
      </div>
    </TerminalOutput>

    <!-- 步驟 3: 執行 ./play-ctf -->
    <CommandLine>./play-ctf</CommandLine>

    <!-- 步驟 4: ./play-ctf 輸出結果 (按鈕) -->
    <TerminalOutput>
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
    </TerminalOutput>
  </TerminalSession>
</template>
