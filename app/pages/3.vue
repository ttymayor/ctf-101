<script setup lang="ts">
import confetti from "canvas-confetti";
import { Effect, Fiber } from "effect";
import imageUrl from "~/assets/路思義的理念.jpg";

const state = reactive({
  inputFlag: "",
});
const errorMsg = ref("");
const isSuccess = ref(false);

// 驗證經緯度：支援小數點後兩位 (24.18 / 120.60)，亦支援直接輸入落在目標範圍內的詳細座標（如 3 位、4 位小數）
const validateFlag = (input: string): boolean => {
  const match = input.trim().match(/^thuctf\{\s*([0-9.]+)\s*[_,]\s*([0-9.]+)\s*\}$/i);
  if (!match || !match[1] || !match[2]) return false;

  const lat = parseFloat(match[1]);
  const lon = parseFloat(match[2]);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return false;

  // 1. 符合四捨五入至小數點後兩位的數值（24.18 / 120.60 或 120.6）
  const isTwoDecimals = lat === 24.18 && lon === 120.6;

  // 2. 落在真實目標座標範圍內（支援小數點後 3 位、4 位或更多位）
  // 範圍：緯度 24.1780 ~ 24.1800，經度 120.5995 ~ 120.6015
  const isWithinRange = lat >= 24.178 && lat <= 24.18 && lon >= 120.5995 && lon <= 120.6015;

  return isTwoDecimals || isWithinRange;
};

let currentFiber: ReturnType<typeof Effect.runFork> | null = null;

const handleErrorFlow = Effect.gen(function* () {
  errorMsg.value = "❌ 座標錯誤，請再試一次！";
  state.inputFlag = "";
  yield* Effect.sleep("2 seconds");
  errorMsg.value = "";
});

const { unlockStage } = useStageProgress();

const handleSuccessFlow = Effect.gen(function* () {
  isSuccess.value = true;
  unlockStage(4);
  if (import.meta.client) {
    confetti({
      spread: 90,
      origin: { y: 0.6 },
    });
  }
  yield* Effect.sleep("600 millis");
  yield* Effect.promise(async () => {
    await navigateTo("/finish");
  });
});

const submitFlag = () => {
  if (currentFiber) {
    Effect.runFork(Fiber.interrupt(currentFiber));
  }

  const program = Effect.gen(function* () {
    if (validateFlag(state.inputFlag)) {
      yield* handleSuccessFlow;
    } else {
      yield* handleErrorFlow;
    }
  });

  currentFiber = Effect.runFork(program);
};

onUnmounted(() => {
  if (currentFiber) {
    Effect.runFork(Fiber.interrupt(currentFiber));
  }
});
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <div class="flex flex-col items-start gap-2">
      <CommandLine>./question-3</CommandLine>
      <h1 class="text-2xl font-black text-white">看圖找座標 📍</h1>
      <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
        身為資安調查員，常需透過公開情報（OSINT）從照片推敲線索。<br />
        請找出照片中著名地標的經緯度座標，數值<strong>四捨五入至小數點後兩位</strong>即可（亦接受範圍內的詳細座標）。
      </p>
      <div
        class="text-[11px] text-purple-300 bg-purple-950/40 border border-purple-800/60 px-2.5 py-1.5 rounded-xs w-full font-mono"
      >
        格式：thuctf{緯度_經度}，例如 thuctf{25.03_121.56}
      </div>
    </div>

    <!-- Image Display -->
    <a
      :href="imageUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative block w-full overflow-hidden rounded-xs ring-1 ring-muted/50 bg-black/40"
    >
      <img
        :src="imageUrl"
        alt="目標建築照片"
        class="w-full h-44 sm:h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-[10px] text-neutral-300 border border-white/10 group-hover:text-white"
      >
        🔍 點擊查看大圖
      </div>
    </a>

    <!-- Submission Form -->
    <UForm class="w-full flex flex-col gap-2" @submit.prevent="submitFlag">
      <UInput
        v-model="state.inputFlag"
        type="text"
        size="lg"
        placeholder="thuctf{25.03_121.56}"
        class="w-full font-mono"
        :ui="{
          base: 'rounded-xs focus-visible:outline-purple-500/50 focus-visible:ring-purple-500',
        }"
      />

      <UButton
        type="submit"
        :disabled="isSuccess"
        size="lg"
        block
        :class="[
          'w-full rounded-xs font-bold text-sm transition-all active:scale-97 justify-center',
          errorMsg
            ? 'bg-error hover:bg-error active:bg-error text-white shadow-red-500/20 animate-[shake_0.15s_linear_3]'
            : 'bg-purple-500 hover:bg-purple-400 active:bg-purple-600 disabled:bg-purple-600 text-neutral-950',
        ]"
      >
        {{ isSuccess ? "🎉 答對了！前往結算..." : errorMsg ? "❌ 座標錯誤！" : "繳交 Flag 🚩" }}
      </UButton>

      <p v-if="errorMsg" class="text-xs text-red-400 text-center">
        {{ errorMsg }}
      </p>
    </UForm>
  </div>
</template>
