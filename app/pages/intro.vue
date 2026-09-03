<script setup lang="ts">
import confetti from "canvas-confetti";

const inputFlag = ref("");
const errorMsg = ref("");
const isSuccess = ref(false);

const correctFlag = "FLAG{welcome_to_hacker_club}";

const submitFlag = async () => {
  if (inputFlag.value.trim() === correctFlag) {
    isSuccess.value = true;
    if (import.meta.client) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setTimeout(async () => {
      await navigateTo("/1");
    }, 600);
  } else {
    errorMsg.value = "❌ Flag 錯誤，請再試一次！";
    setTimeout(() => {
      errorMsg.value = "";
    }, 2000);
  }
};
</script>

<template>
  <div
    class="min-h-screen max-w-md mx-auto flex flex-col justify-center px-6 py-10 select-none"
  >
    <UCard class="border-neutral-800 bg-neutral-900/90 shadow-2xl">
      <div class="space-y-6">
        <div class="space-y-2">
          <span
            class="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider"
            >STAGE 00</span
          >
          <h1 class="text-2xl font-black text-white">什麼是 CTF？</h1>
          <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <strong>CTF（Capture The Flag，奪旗賽）</strong>
            是資安領域的解謎競技。參賽者要在題目中找出格式如
            <code class="text-emerald-400 font-mono">FLAG{...}</code>
            的關鍵字串並繳交。
          </p>
        </div>

        <!-- Answer written directly on page -->
        <div
          class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2"
        >
          <div class="text-xs text-neutral-400">本關答案（請複製並繳交）：</div>
          <div
            class="p-2.5 bg-neutral-900 rounded-lg text-emerald-400 font-mono font-bold text-xs sm:text-sm select-all break-all border border-neutral-800"
          >
            {{ correctFlag }}
          </div>
        </div>

        <!-- Submission Form -->
        <form class="space-y-3" @submit.prevent="submitFlag">
          <input
            v-model="inputFlag"
            type="text"
            placeholder="請輸入 FLAG{...}"
            class="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />

          <UButton
            type="submit"
            :disabled="isSuccess"
            size="lg"
            block
            class="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 text-neutral-950 font-bold rounded-xl text-sm transition-transform active:scale-95 cursor-pointer justify-center"
          >
            {{ isSuccess ? "🎉 答對了！前往下一關..." : "繳交 Flag" }}
          </UButton>
          <p v-if="errorMsg" class="text-xs text-red-400 text-center">
            {{ errorMsg }}
          </p>
        </form>
      </div>
    </UCard>
  </div>
</template>
