<template>
  <span
    class="vmTag"
    :class="{
      vmTag_small: useSmall,
      vmTag_success: variant === 'success',
      vmTag_warning: variant === 'warning',
      vmTag_error: variant === 'error',
      vmTag_inactive: variant === 'inactive',
    }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'success' | 'warning' | 'error' | 'inactive';
    useSmall?: boolean;
  }>(),
  {
    variant: 'default',
    useSmall: false,
  }
);
</script>
