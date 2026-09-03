<script setup lang="ts">
import confetti from "canvas-confetti";
import { Effect, Fiber } from "effect";

const state = reactive({
  inputFlag: "",
});
const errorMsg = ref("");
const isSuccess = ref(false);

const cipher = "guhpgs{p43f4e_p1cu3e}";
const correctFlag = "thuctf{c43s4r_c1ph3r}";
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
  unlockStage(3);
  if (import.meta.client) {
    confetti({
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  yield* Effect.sleep("600 millis");
  yield* Effect.promise(async () => {
    await navigateTo("/3");
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
  <TerminalSession class="w-full flex flex-col items-start gap-4 min-h-[300px]">
    <CommandLine>./question-2</CommandLine>

    <TerminalOutput class="w-full flex flex-col items-start gap-4">
      <div class="flex flex-col items-start gap-2">
        <h1 class="text-2xl font-black text-white">凱撒可能不是沙拉 🥗</h1>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          明明看起來有大括號包住 <code>{}</code> 但卻不是 flag，你能找到規律嗎？
        </p>
      </div>

      <!-- Only display the Caesar ciphertext -->
      <div class="space-y-2 w-full">
        <div class="text-xs text-muted">密文：</div>
        <div
          class="w-full p-3 bg-black/20 rounded-xs text-amber-400 font-mono font-bold text-xs sm:text-sm select-all break-all ring ring-muted"
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
            base: 'rounded-xs focus-visible:outline-amber-500/50 focus-visible:ring-amber-500',
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
              : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-600 text-neutral-950',
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
