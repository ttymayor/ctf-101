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
  <TerminalSession class="min-h-[437px]">
    <CommandLine>./mission-completed</CommandLine>

    <TerminalOutput>
      <div class="flex flex-col gap-4 items-center">
        <div class="text-5xl animate-bounce">🏆</div>
        <h1 class="text-3xl font-black text-white tracking-tight">恭喜通關！</h1>
        <div
          class="flex flex-col items-center text-xs sm:text-sm text-muted leading-relaxed max-w-sm"
        >
          <p>我喜歡你有探究精神的樣子！</p>
          <p>如果對駭客社有興趣，歡迎參考以下資訊！</p>
        </div>
      </div>

      <SocialLink />

      <!-- 迎新報名表單按鈕 -->
      <div class="w-full flex flex-col gap-2.5 pt-1">
        <UButton
          to="/"
          size="lg"
          block
          variant="outline"
          class="w-full border-neutral-700 hover:bg-neutral-800 text-white font-bold text-sm rounded-xs transition-transform active:scale-95 cursor-pointer justify-center"
        >
          返回首頁
        </UButton>
      </div>
    </TerminalOutput>
  </TerminalSession>
</template>
