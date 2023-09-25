<template>
  <div class="vmProgressBar">
    <span class="vmProgressBar__label">
      <slot name="label" />
    </span>
    <div class="vmProgressBar__wrapper">
      <div class="vmProgressBar__line vmProgressBar__line_active" :style="`width: ${percent}%`" />
      <div class="vmProgressBar__line vmProgressBar__line_notActive" />
    </div>
    <span class="vmProgressBar__description">
      <slot name="description" />
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    percent?: string;
  }>(),
  {
    percent: '100',
  }
);
</script>
