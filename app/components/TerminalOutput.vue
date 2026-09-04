<script setup lang="ts">
import { Effect, Fiber } from "effect";
import { twMerge } from "tailwind-merge";

const props = withDefaults(
  defineProps<{
    pause?: number; // 顯示後的暫停時間（毫秒），之後切換至下一步
    class?: string;
  }>(),
  {
    pause: 180,
    class: "",
  },
);

const session = inject<TerminalSessionContext | null>(terminalSessionKey, null);
const stepIndex = session ? session.registerStep() : 0;

const isVisible = computed(() => {
  if (!session) return true;
  return session.currentStep.value >= stepIndex;
});

let fiber: ReturnType<typeof Effect.runFork> | null = null;

if (session) {
  watch(
    () => session.currentStep.value,
    (step) => {
      if (step === stepIndex) {
        const program = Effect.gen(function* () {
          if (props.pause > 0) {
            yield* Effect.sleep(`${props.pause} millis`);
          }
          session.nextStep();
        });

        fiber = Effect.runFork(program);
      }
    },
    { immediate: true },
  );
}

onUnmounted(() => {
  if (fiber) {
    Effect.runFork(Fiber.interrupt(fiber));
  }
});

const defaultClass =
  "w-full flex flex-col items-center text-center gap-4 transition-opacity duration-200 animate-in fade-in [&_*]:text-start";
</script>

<template>
  <div v-if="isVisible" :class="twMerge(defaultClass, props.class)">
    <slot />
  </div>
</template>
