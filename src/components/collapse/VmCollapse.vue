<template>
  <div ref="VmCollapse" class="vmCollapse" :class="{ vmCollapse_open: isCollapseOpen }">
    <button class="vmCollapse__btn" @click="handleClick">
      <span class="vmCollapse__btn_content">
        <base-icon class="vmCollapse__btn_icon">
          <chevron-down-icon />
        </base-icon>
        <template v-if="label">
          {{ label }}
        </template>
        <template v-else>
          <slot name="label" />
        </template>
      </span>
    </button>
    <div class="vmCollapse__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { BaseIcon, ChevronDownIcon } from '@/lib';

defineSlots<{
  default(): any;
  label(): any;
}>();

const props = withDefaults(
  defineProps<{
    label?: string;
    useClickOutside?: boolean;
  }>(),
  {
    label: '',
    useClickOutside: false,
  }
);

const isCollapseOpen = ref(false);
const VmCollapse = ref<HTMLElement | null>(null);

onClickOutside(VmCollapse, () => {
  if (props.useClickOutside) {
    isCollapseOpen.value = false;
  }
});

const handleClick = () => {
  isCollapseOpen.value = !isCollapseOpen.value;
};
</script>
