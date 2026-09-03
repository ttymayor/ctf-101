<script setup lang="ts">
import { Effect, Fiber } from "effect";

const props = withDefaults(
  defineProps<{
    command?: string;
    speed?: number; // 每個字的打字間隔（毫秒）
    delay?: number; // 開始打字前的延遲（毫秒）
    cursor?: boolean; // 是否啟用游標功能
    enterDelay?: number; // 打字完成後模擬按下 Enter 的延遲時間（毫秒）
  }>(),
  {
    command: undefined,
    speed: 40,
    delay: 80,
    cursor: true,
    enterDelay: 120,
  },
);

const slots = useSlots();
const displayedText = ref("");

// 支援 Headless Provider: 注入父層 TerminalSession
const session = inject<TerminalSessionContext | null>(terminalSessionKey, null);
const stepIndex = session ? session.registerStep() : 0;

// 是否可見：在 Session 內時，需輪到或已過此步驟
const isVisible = computed(() => {
  if (!session) return true;
  return session.currentStep.value >= stepIndex;
});

// 游標顯示邏輯：
// 1. 如果 prop 明確設為 false，則不顯示
// 2. 如果在 Session 內，只有當此行正在打字或屬於最新啟用步驟時才顯示游標
// 3. 如果是獨立使用，則持續顯示
const shouldShowCursor = computed(() => {
  if (!props.cursor) return false;
  if (!session) return true;
  return session.currentStep.value === stepIndex;
});

let currentFiber: ReturnType<typeof Effect.runFork> | null = null;

// 從 slot 或 prop 中取得完整的指令文字
const getRawText = (): string => {
  if (props.command) {
    return props.command;
  }
  if (!slots.default) {
    return "";
  }
  const vnodes = slots.default();
  return vnodes
    .map((v) => {
      if (typeof v.children === "string") return v.children;
      if (typeof v.children === "number") return String(v.children);
      return "";
    })
    .join("")
    .trim();
};

const startTyping = () => {
  const fullText = getRawText();
  if (!fullText) {
    if (session && session.currentStep.value === stepIndex) {
      session.nextStep();
    }
    return;
  }

  const typingProgram = Effect.gen(function* () {
    if (props.delay > 0) {
      yield* Effect.sleep(`${props.delay} millis`);
    }

    for (let i = 1; i <= fullText.length; i++) {
      displayedText.value = fullText.slice(0, i);
      yield* Effect.sleep(`${props.speed} millis`);
    }

    // 打字完成，稍作停頓後若在 Session 內則通知進入下一步
    if (session) {
      if (props.enterDelay > 0) {
        yield* Effect.sleep(`${props.enterDelay} millis`);
      }
      session.nextStep();
    }
  });

  currentFiber = Effect.runFork(typingProgram);
};

// 若在 Session 中，監聽輪到自己時才開始打字；若為獨立元件則在 onMounted 開始
if (session) {
  watch(
    () => session.currentStep.value,
    (step) => {
      if (step === stepIndex) {
        startTyping();
      }
    },
    { immediate: true },
  );
} else {
  onMounted(() => {
    startTyping();
  });
}

onUnmounted(() => {
  if (currentFiber) {
    Effect.runFork(Fiber.interrupt(currentFiber));
  }
});
</script>

<template>
  <div v-if="isVisible" class="w-full flex flex-wrap items-center gap-2.5 font-mono select-none">
    <span class="font-bold text-primary">➜</span>
    <span class="prompt-dir text-secondary font-bold">~</span>
    <span class="command font-semibold text-neutral-100 inline-flex items-center">
      <span>{{ displayedText }}</span>
      <span
        v-if="shouldShowCursor"
        class="inline-block w-2 h-4 bg-primary ml-1 align-middle animate-pulse"
        aria-hidden="true"
      />
    </span>
  </div>
</template>
