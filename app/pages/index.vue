<script setup lang="ts">
useHead({
  title: "駭客社 - 新生 CTF 闖關",
});
</script>

<template>
  <TerminalSession class="min-h-[239.5px]">
    <!-- 步驟 1: 執行 whoami -->
    <CommandLine>whoami</CommandLine>

    <!-- 步驟 2: whoami 輸出結果 -->
    <TerminalOutput>
      <TerminalCallout>
        <h1 class="font-black text-white tracking-tight">🚩 東海駭客社 THU Hacker Club</h1>
        <p class="text-sm text-neutral-400">新生攤位 CTF 解謎闖關</p>
      </TerminalCallout>
    </TerminalOutput>

    <!-- 步驟 3: 執行 ./play-ctf -->
    <CommandLine>./play-ctf</CommandLine>

    <!-- 步驟 4: ./play-ctf 輸出結果 (按鈕) -->
    <TerminalOutput>
      <div class="w-full flex flex-col items-center gap-2">
        <UButton
          to="/intro"
          size="lg"
          block
          class="w-full rounded-xs bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer justify-center"
        >
          開始挑戰 🔥
        </UButton>
        <NuxtLink
          to="/info"
          class="text-xs text-muted font-mono underline underline-offset-4 hover:no-underline transition-opacity hover:opacity-80"
        >
          不通關，看看社群連結
        </NuxtLink>
      </div>
    </TerminalOutput>
  </TerminalSession>
</template>
