<template>
  <ul
    class="vmList"
    :class="{
      vmList_main: variant === 'main',
      vmList_inner: variant === 'inner',
    }"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'main' | 'inner';
  }>(),
  {
    variant: 'main',
  }
);
</script>

<style scoped></style>
