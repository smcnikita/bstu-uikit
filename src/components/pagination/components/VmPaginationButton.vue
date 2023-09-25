<template>
  <button
    type="button"
    class="vmPagination__button"
    :class="{
      selected: selected,
      next: isNext,
      support: isSupport,
    }"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click', event: HTMLButtonElement): void;
}>();

withDefaults(
  defineProps<{
    selected?: boolean;
    isNext?: boolean;
    isSupport?: boolean;
  }>(),
  {
    selected: false,
    isNext: false,
    isSupport: false,
  }
);
</script>

<style scoped></style>
