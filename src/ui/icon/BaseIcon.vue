<template>
  <!--
    svg обертка для всех иконок
  -->

  <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
    <slot />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    viewBox?: string;
    width?: number;
    height?: number;
  }>(),
  {
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
  }
);
</script>
