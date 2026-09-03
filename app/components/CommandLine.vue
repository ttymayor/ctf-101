<script setup lang="ts"></script>

<template>
  <div class="w-full flex flex-wrap items-center gap-3 font-mono">
    <span class="font-bold text-primary">➜</span>
    <span class="prompt-dir text-secondary">~</span>
    <span class="command">
      <slot />
    </span>
  </div>
</template>
