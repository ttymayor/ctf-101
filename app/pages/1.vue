<script setup lang="ts">
import confetti from "canvas-confetti";
import { Effect, Fiber } from "effect";

const state = reactive({
  inputFlag: "",
});
// const inputFlag = ref("");
const errorMsg = ref("");
const isSuccess = ref(false);

const cipher = "dGh1Y3Rme2I0c2U2NF8xc19uMHRfM25jcnlwdDEwbn0=";
const correctFlag = "thuctf{b4se64_1s_n0t_3ncrypt10n}";

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
  unlockStage(2);
  if (import.meta.client) {
    confetti({
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  yield* Effect.sleep("600 millis");
  yield* Effect.promise(async () => {
    await navigateTo("/2");
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
  <TerminalSession class="min-h-[325px]">
    <CommandLine>./question-1</CommandLine>

    <TerminalOutput>
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-black text-white">編碼不是加密！</h1>
        <p class="text-xs sm:text-sm text-muted leading-relaxed">
          這是一段特殊字串，特徵是尾端的
          <code>=</code> 聽說這是被一套運算後的結果，你有辦法復原嗎？
        </p>
      </div>

      <!-- Only display the Base64 result -->
      <div class="space-y-2">
        <div class="text-xs text-muted">密文：</div>
        <div
          class="p-3 bg-black/20 rounded-xs text-cyan-400 font-mono font-bold text-xs sm:text-sm select-all break-all ring-1 ring-muted"
        >
          {{ cipher }}
        </div>
      </div>

      <!-- Submission Form -->
      <UForm class="w-full flex flex-col gap-2" @submit.prevent="submitFlag">
        <UInput
          v-model="state.inputFlag"
          type="text"
          size="lg"
          placeholder="thuctf{...}"
          class="w-full font-mono"
          :ui="{
            base: 'rounded-xs focus-visible:outline-cyan-500/50 focus-visible:ring-cyan-500',
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
              : 'bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 disabled:bg-cyan-600 text-neutral-950',
          ]"
        >
          {{
            isSuccess
              ? "🎉 答對了！前往下一關..."
              : errorMsg
                ? "好像不對，試試其他答案"
                : "繳交 Flag 🚩"
          }}
        </UButton>
      </UForm>
    </TerminalOutput>
  </TerminalSession>
</template>
