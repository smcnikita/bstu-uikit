<template>
  <div
    class="vmIndicator"
    :class="{
      vmIndicator__large: variant === 'large',
      vmIndicator__small: variant === 'small',
    }"
  >
    <div class="vmIndicator__item" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'large' | 'medium' | 'small';
  }>(),
  {
    variant: 'medium',
  }
);
</script>
