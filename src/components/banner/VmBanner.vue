<template>
  <div class="vmBanner">
    <div v-if="useHeader" class="vmBanner__header">
      <slot name="header" />
    </div>

    <slot name="title" />

    <slot />

    <div v-if="useFooter" class="vmBanner__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    useHeader?: boolean;
    useFooter?: boolean;
  }>(),
  {
    useHeader: true,
    useFooter: true,
  }
);
</script>

<style scoped></style>
