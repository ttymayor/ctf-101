<script setup lang="ts">
import confetti from "canvas-confetti";

useHead({
  title: "通關成功！ - 駭客社 新生 CTF 闖關",
});

onMounted(() => {
  if (import.meta.client) {
    // 兩側連發彩帶特效慶祝全通關
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x: 0.2, y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: 0.8, y: 0.6 },
      });
    }, 250);
  }
});
</script>

<template>
  <TerminalSession class="w-full flex flex-col items-center text-center gap-5 min-h-[360px]">
    <CommandLine>./mission-completed</CommandLine>

    <TerminalOutput class="w-full flex flex-col items-center text-center gap-5">
      <div class="space-y-3 flex flex-col items-center">
        <div class="text-5xl animate-bounce">🏆</div>
        <h1 class="text-3xl font-black text-white tracking-tight">恭喜全數通關！</h1>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
          我喜歡你有探究精神的樣子！
        </p>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
          如果對駭客社有興趣，歡迎參考以下資訊！
        </p>
      </div>

      <SocialLink />

      <!-- 迎新報名表單按鈕 -->
      <div class="w-full flex flex-col gap-2.5 pt-1">
        <UButton
          to="https://docs.google.com/forms/d/e/1FAIpQLSfnG-FexqVULbGiJuNOPpczB4-l3-V_WkzkcVvKNqbkc9Uxlg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          block
          trailing-icon="i-lucide-external-link"
          :ui="{ trailingIcon: 'ms-0' }"
          class="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm rounded-xs shadow-lg transition-transform active:scale-95 cursor-pointer justify-center"
        >
          📝 立即報名迎新社課
        </UButton>

        <UButton
          to="/"
          size="lg"
          block
          variant="outline"
          class="w-full border-neutral-700 hover:bg-neutral-800 text-white font-bold text-sm rounded-xs transition-transform active:scale-95 cursor-pointer justify-center"
        >
          再玩一次 / 返回首頁
        </UButton>
      </div>
    </TerminalOutput>
  </TerminalSession>
</template>
