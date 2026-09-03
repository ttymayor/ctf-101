<script setup lang="ts">
import confetti from "canvas-confetti";
import { Effect, Fiber } from "effect";

const state = reactive({
  inputFlag: "",
});
const errorMsg = ref("");
const isSuccess = ref(false);

const correctFlag = "thuctf{welcome_to_hacker_club}";

let currentFiber: ReturnType<typeof Effect.runFork> | null = null;

const handleErrorFlow = Effect.gen(function* () {
  errorMsg.value = "❌ Flag 錯誤，請再試一次！";
  state.inputFlag = "";
  yield* Effect.sleep("2 seconds");
  errorMsg.value = "";
});

const { unlockStage } = useStageProgress();

const handleSuccessFlow = Effect.gen(function* () {
  isSuccess.value = true;
  unlockStage(1);
  if (import.meta.client) {
    confetti({
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  yield* Effect.sleep("600 millis");
  yield* Effect.promise(async () => {
    await navigateTo("/1");
  });
});

const submitFlag = () => {
  if (currentFiber) {
    Effect.runFork(Fiber.interrupt(currentFiber));
  }

  const program = Effect.gen(function* () {
    if (state.inputFlag.trim() === correctFlag) {
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
  <TerminalSession class="w-full flex flex-col items-start gap-4 min-h-[320px]">
    <CommandLine>./intro</CommandLine>

    <TerminalOutput class="w-full flex flex-col items-start gap-4">
      <div class="flex flex-col items-start gap-2">
        <h1 class="text-2xl font-black text-white">什麼是 CTF？</h1>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <strong> CTF（Capture The Flag，奪旗賽）</strong
          >是資安領域的解謎競技。參賽者要在題目中找出格式如
          <code class="text-emerald-400 font-mono">thuctf{...}</code>
          的關鍵字串並繳交。
        </p>
      </div>

      <!-- Answer written directly on page -->
      <div class="w-full flex flex-col items-start gap-2">
        <div class="text-xs text-neutral-400">本關答案（請複製並繳交）：</div>
        <div
          class="w-full p-2.5 bg-black/20 rounded-xs text-emerald-400 font-mono font-bold text-xs sm:text-sm select-all break-all ring-1 ring-muted"
        >
          {{ correctFlag }}
        </div>
      </div>

      <!-- Submission Form -->
      <UForm class="w-full flex flex-col gap-2" @submit.prevent="submitFlag">
        <UInput
          v-model="state.inputFlag"
          size="lg"
          type="text"
          placeholder="請輸入 thuctf{...}"
          class="w-full font-mono"
          :ui="{
            base: 'rounded-xs focus-visible:outline-emerald-500/50 focus-visible:ring-emerald-500',
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
              ? 'bg-error hover:bg-error active:bg-error text-white shadow-red-500/20 animate-[shake_0.2s_linear_2]'
              : 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-emerald-600 text-neutral-950',
          ]"
        >
          {{
            isSuccess ? "🎉 答對了！前往下一關..." : errorMsg ? "❌ Flag 錯誤！" : "繳交 Flag 🚩"
          }}
        </UButton>
      </UForm>
    </TerminalOutput>
  </TerminalSession>
</template>
