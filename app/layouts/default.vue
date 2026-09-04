<template>
  <div class="min-h-screen max-w-md mx-auto flex flex-col justify-center px-6 py-10 select-none">
    <UCard
      class="w-full min-h-[280px] border-neutral-800 bg-neutral-900/90 shadow-2xl transition-[height] duration-200"
      :ui="{
        body: 'sm:p-4 p-4',
        header: 'sm:px-4 px-3 py-3 flex justify-between',
      }"
    >
      <template #header>
        <div class="terminal-header">
          <div class="dot dot-close" />
          <div class="dot dot-min" />
          <div class="dot dot-max" />
        </div>
        <span class="text-xs text-muted font-semibold">Bash</span>
      </template>
      <slot />
    </UCard>
  </div>
</template>

<style scoped>
.terminal-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot-close {
  background-color: #ff5f57;
}

.dot-min {
  background-color: #ffbd2e;
}

.dot-max {
  background-color: #27c93f;
}
</style>
