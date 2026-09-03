<script setup lang="ts">
import confetti from "canvas-confetti";

const inputFlag = ref("");
const errorMsg = ref("");
const isSuccess = ref(false);

const cipher = "RkxBR3tiNHNlNjRfMXNfbjB0XzNuY3J5cHQxMG59";
const correctFlag = "FLAG{b4se64_1s_n0t_3ncrypt10n}";

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
      await navigateTo("/2");
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
  <div class="min-h-screen max-w-md mx-auto flex flex-col justify-center px-6 py-10 select-none">
    <UCard class="border-neutral-800 bg-neutral-900/90 shadow-2xl">
      <div class="space-y-6">
        <div class="space-y-2">
          <span class="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider"
            >STAGE 01</span
          >
          <h1 class="text-2xl font-black text-white">第一關：Base64</h1>
          <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            這是一段 Base64 編碼後的字串，請自行將它解碼還原出 Flag：
          </p>
        </div>

        <!-- Only display the Base64 result -->
        <div class="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
          <div class="text-xs text-neutral-400">密文 (Base64)：</div>
          <div
            class="p-3 bg-neutral-900 rounded-lg text-cyan-400 font-mono font-bold text-xs sm:text-sm select-all break-all border border-neutral-800"
          >
            {{ cipher }}
          </div>
        </div>

        <!-- Submission Form -->
        <form class="space-y-3" @submit.prevent="submitFlag">
          <input
            v-model="inputFlag"
            type="text"
            placeholder="請輸入解碼後的 FLAG{...}"
            class="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
          />

          <UButton
            type="submit"
            :disabled="isSuccess"
            size="lg"
            block
            class="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-600 text-neutral-950 font-bold rounded-xl text-sm transition-transform active:scale-95 cursor-pointer justify-center"
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
