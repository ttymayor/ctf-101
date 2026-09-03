<script setup lang="ts">
const { currentStep, reset, nextStep } = useTerminalSession();

defineExpose({
  currentStep,
  reset,
  nextStep,
});
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <slot :current-step="currentStep" :next-step="nextStep" :reset="reset" />
  </div>
</template>
