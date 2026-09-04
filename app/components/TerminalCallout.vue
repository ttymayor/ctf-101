<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: "primary" | "secondary" | "cyan" | "amber" | "purple" | "muted";
  }>(),
  {
    color: "primary",
  },
);

const defaultClass =
  "w-full flex flex-col rounded-r-xs items-start gap-2 bg-black/20 p-4 border-l-2 text-left";
const textClass =
  "text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm [&_ol]:list-disc [&_ol]:list-inside";
</script>

<template>
  <div
    :class="[
      defaultClass,
      textClass,
      {
        'border-primary': color === 'primary',
        'border-secondary': color === 'secondary',
        'border-cyan-500': color === 'cyan',
        'border-amber-500': color === 'amber',
        'border-purple-500': color === 'purple',
        'border-muted': color === 'muted',
      },
    ]"
  >
    <slot />
  </div>
</template>
