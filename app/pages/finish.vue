<script setup lang="ts">
import confetti from "canvas-confetti";

useHead({
  title: "通關成功！ - 駭客社 新生 CTF 闖關",
});

const { resetProgress } = useStageProgress();

const handleRestart = async () => {
  resetProgress();
  await navigateTo("/");
};
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
          你已經成功破解了從編碼（Base64）、古典密碼（凱撒）到公開情報搜集（OSINT）的所有新生挑戰！
        </p>
      </div>

      <div
        class="w-full p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xs text-xs text-emerald-300 space-y-1 text-left font-mono"
      >
        <div class="font-bold flex items-center gap-1.5 text-emerald-400">
          <span>🚩</span>
          <span>東海大學 駭客社 Hacker Club</span>
        </div>
        <p class="text-neutral-300 text-[11px] leading-normal font-sans">
          想了解更多 Web 網頁安全、逆向工程、密碼學與資安競賽嗎？歡迎追蹤我們的社團資訊！
        </p>
      </div>

      <div class="w-full pt-1">
        <UButton
          size="lg"
          block
          class="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm rounded-xs transition-transform active:scale-95 cursor-pointer justify-center"
          @click="handleRestart"
        >
          再玩一次 / 返回首頁
        </UButton>
      </div>
    </TerminalOutput>
  </TerminalSession>
</template>
