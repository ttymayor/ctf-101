<script setup lang="ts">
import confetti from "canvas-confetti";

onMounted(() => {
  if (import.meta.client) {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
  }
});
</script>

<template>
  <div
    class="min-h-screen max-w-md mx-auto flex flex-col justify-center px-6 py-10 text-center select-none"
  >
    <UCard class="border-neutral-800 bg-neutral-900/90 shadow-2xl">
      <div class="space-y-6 flex flex-col items-center">
        <div class="space-y-3">
          <div class="text-4xl animate-bounce">🎉</div>
          <span class="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider"
            >STAGE 03</span
          >
          <h1 class="text-2xl font-black text-white">第三關：先不做</h1>
          <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            恭喜你已經完成前兩關的挑戰！<br />
            更進階的題目請鎖定未來的迎新社課，敬請期待！
          </p>
        </div>

        <div class="w-full pt-2">
          <UButton
            to="/"
            size="lg"
            variant="outline"
            block
            class="w-full border-neutral-700 hover:bg-neutral-800 text-white font-bold text-sm transition-transform active:scale-95 cursor-pointer justify-center"
          >
            返回首頁
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
