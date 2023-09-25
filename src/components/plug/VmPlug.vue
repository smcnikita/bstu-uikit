<template>
  <div class="vmPlug">
    <h1 class="vmPlug__title">{{ title }}</h1>
    <p class="vmPlug__description">{{ description }}</p>
    <div
      class="vmPlug__actions"
      :class="{
        vmPlug__actions_one: !useSecondaryButton,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    useSecondaryButton?: boolean;
  }>(),
  {
    title: 'Страница не найдена',
    description: 'Возможно она удалена или введён неправильный адрес',
    useSecondaryButton: true,
  }
);
</script>
