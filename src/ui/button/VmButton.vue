<template>
  <button
    :id="id"
    :type="type"
    :autofocus="autofocus"
    :name="name"
    class="vmButton"
    :class="{
      vmButton_primary: variant === 'primary',
      vmButton_secondary: variant === 'secondary',
      vmButton_tertiary: variant === 'tertiary',
      vmButton_icon_tertiary: variant === 'iconTertiary',
      vmButton_medium: size === 'medium',
      vmButton_small: size === 'small',
    }"
    v-bind="computedAttrs"
    @click="onClick"
  >
    <spinner-icon v-if="loading" class="vmButton_spinner" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SpinnerIcon } from '@/lib';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary' | 'iconTertiary';
    type?: 'submit' | 'reset' | 'button';
    id?: string;
    name?: string;
    autofocus?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: 'large' | 'medium' | 'small';
  }>(),
  {
    variant: 'primary',
    type: 'button',
    autofocus: false,
    disabled: false,
    loading: false,
    size: 'large',
  }
);

const emit = defineEmits(['clicked']);

const computedAttrs = computed(() => {
  if (props.loading) return { disabled: true };
  else return { disabled: props.disabled };
});

const onClick = (event: Event) => {
  if (props.disabled || props.loading) {
    event.stopPropagation();
  }

  emit('clicked', event);
};
</script>
